import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// パスワード変更
export async function POST(request: Request) {
  const { currentPassword, newPassword } = await request.json();
  const userId = request.headers.get('userId');
  if (!userId) {
    return NextResponse.json({ message: 'ユーザーIDが見つかりません' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.hashedPassword) {
      return NextResponse.json(
        { message: 'ユーザーが存在しないか、パスワードが設定されていません' },
        { status: 400 },
      );
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.hashedPassword);
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ message: '現在のパスワードが間違っています' }, { status: 400 });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.hashedPassword);
    if (isSamePassword) {
      return NextResponse.json(
        { message: '新しいパスワードが現在のパスワードと同じです' },
        { status: 400 },
      );
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: userId },
      data: { hashedPassword: hashedNewPassword },
    });

    return NextResponse.json({ message: 'パスワードが更新されました' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'エラーが発生しました' }, { status: 500 });
  }
}
