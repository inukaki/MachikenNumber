import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: '既に登録されているメールアドレスです' },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    //＊＊＊＊＊以下変更点＊＊＊＊＊
    const newUser = await prisma.user.create({
      data: { name, email, hashedPassword },
    });

    // Nest.jsにuserIdを送信
    const nestResponse = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: newUser.id }),
    });

    if (!nestResponse.ok) {
      console.error('Nest.jsへの登録に失敗しました');
    }
    //＊＊＊＊＊以上変更点＊＊＊＊＊

    return NextResponse.json({ message: 'サインアップ成功' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
