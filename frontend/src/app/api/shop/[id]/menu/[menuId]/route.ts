import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { menuSchema } from '@/schema/menuSchema';

export async function PUT(
  request: Request,
  { params }: { params: { shopId: string; menuId: string } },
) {
  try {
    const { shopId, menuId } = params;
    const body = await request.json();

    // バリデーション
    const validatedData = menuSchema.parse(body);

    // データベースの更新
    // const updatedMenu = await prisma.menu.update({
    //   where: {
    //     id: menuId,
    //     shopId,
    //   },
    //   data: {
    //     name: validatedData.name,
    //     price: validatedData.price,
    //     time: validatedData.time,
    //   },
    // });

    // return NextResponse.json(updatedMenu);
    return NextResponse.json({ error: 'update menu' }, { status: 200 });
  } catch (error) {
    console.error('Failed to update menu:', error);
    return NextResponse.json({ error: 'Failed to update menu' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { shopId: string; menuId: string } },
) {
  try {
    const { shopId, menuId } = params;

    // データベースから削除
    // await prisma.menu.delete({
    //   where: {
    //     id: menuId,
    //     shopId,
    //   },
    // });

    return NextResponse.json({ message: 'delete menu' });
  } catch (error) {
    console.error('Failed to delete menu:', error);
    return NextResponse.json({ error: 'Failed to delete menu' }, { status: 500 });
  }
}
