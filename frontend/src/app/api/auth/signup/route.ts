import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();

    const userRole = role;

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
      data: { name, email, hashedPassword, role: userRole }, // roleを保存
    });

    console.log(newUser);
    console.log(newUser.id);

    // Nest.jsにuserIdを送信;
    if (newUser.role === 'shop') {
      const nestResponse = await fetch('http://localhost:3001/shops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shop_id: newUser.id, name: newUser.name }),
      });

      if (!nestResponse.ok) {
        console.error('Nest.jsへの登録に失敗しました');
      }
    }

    if (newUser.role === 'event') {
      const nestResponse = await fetch('http://localhost:3001/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event_id: newUser.id, name: newUser.name }),
      });

      if (!nestResponse.ok) {
        console.error('Nest.jsへの登録に失敗しました');
      }
    }
    // ＊＊＊＊＊以上変更点＊＊＊＊＊

    return NextResponse.json({ message: 'サインアップ成功' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
