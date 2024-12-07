import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { sendResetPassword } from '@/actions/sendResetPassword';

// パスワード再設定
export async function POST(request: Request) {
  const { token, password } = await request.json();

  try {
    const foundToken = await prisma.passwordResetToken.findFirst({
      where: { token },
      include: { User: true },
    });

    if (!foundToken || new Date() > foundToken.expiry) {
      return NextResponse.json({ message: 'トークンが無効または期限切れです' }, { status: 400 });
    }

    const isSamePassword = await bcrypt.compare(password, foundToken.User.hashedPassword || '');
    if (isSamePassword) {
      return NextResponse.json(
        { message: '新しいパスワードは現在のパスワードと異なる必要があります' },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.$transaction([
      prisma.user.update({
        where: { id: foundToken.userId },
        data: { hashedPassword },
      }),
      prisma.passwordResetToken.deleteMany({ where: { userId: foundToken.userId } }),
    ]);

    await sendResetPassword({ userId: foundToken.userId });
    return NextResponse.json({ message: 'パスワードが再設定されました' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'エラーが発生しました' }, { status: 500 });
  }
}
