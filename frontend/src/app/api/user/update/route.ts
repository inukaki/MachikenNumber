// ユーザー情報の更新に使う認証用API、cloudinaryを用いて写真などの変換に用いる。
// ユーザー情報の更新には、ユーザーIDを取得する必要があるが、これはイベントとショップでの違いはない。

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { deleteCloudImage, createCloudImage } from '@/actions/cloudImage';
import { extractPublicId } from 'cloudinary-build-url';

// ユーザー情報更新
export async function PUT(request: Request) {
  const { name, introduction, base64Image } = await request.json();
  const userId = request.headers.get('id');
  if (!userId) {
    return NextResponse.json({ message: 'ユーザーIDが存在しません' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ message: 'ユーザーが存在しません' }, { status: 400 });
    }

    let image_url;
    if (base64Image) {
      if (user.image) {
        const publicId = extractPublicId(user.image);
        await deleteCloudImage(publicId);
      }
      image_url = await createCloudImage(base64Image);
    }

    await prisma.user.update({
      where: { id: userId },
      data: { name, introduction, ...(image_url && { image: image_url }) },
    });

    return NextResponse.json({ message: 'ユーザー情報が更新されました' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'エラーが発生しました' }, { status: 500 });
  }
}
