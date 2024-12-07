import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { sendForgotPassword } from '@/actions/sendForgotPassword';

const ONE_HOUR = 1000 * 60 * 60;
const ONE_DAY = ONE_HOUR * 24;

// パスワード再設定メール送信
export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    const user = await prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });
    if (!user) {
      return NextResponse.json({ message: 'ユーザーが存在しません' }, { status: 400 });
    }

    const existingToken = await prisma.passwordResetToken.findFirst({
      where: {
        userId: user.id,
        expiry: { gt: new Date() },
        createdAt: { gt: new Date(Date.now() - ONE_HOUR) },
      },
    });

    if (existingToken) {
      return NextResponse.json(
        { message: '既にパスワード再設定メールを送信済みです' },
        { status: 400 },
      );
    }

    const token = crypto.randomBytes(18).toString('hex');
    await prisma.passwordResetToken.create({
      data: { token, expiry: new Date(Date.now() + ONE_DAY), userId: user.id },
    });

    await sendForgotPassword({ userId: user.id });
    return NextResponse.json({ message: 'パスワード再設定メールを送信しました' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'エラーが発生しました' }, { status: 500 });
  }
}
