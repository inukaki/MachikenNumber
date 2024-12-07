import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/nextauth';

export async function authMiddleware() {
  const user = await getAuthSession(); // 認証セッションの取得

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}
