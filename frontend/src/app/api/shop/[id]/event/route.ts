import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  return NextResponse.json({ message: `Hello, ${id}!` });
};
