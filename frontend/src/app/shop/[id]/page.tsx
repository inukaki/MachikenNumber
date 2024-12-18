import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import ShopHome from '@/components/shop/ShopHome';

export default async function ShopDetail({ params }: { params: { id: string } }) {
  const session = await getAuthSession();

  // セッションがない場合、ログインページにリダイレクト
  if (!session || session.role !== 'shop') {
    redirect('/login');
  }

  // ユーザーIDをチェック
  const loggedInUserId = session.id; // セッションに含まれるユーザーID
  const shopId = params.id; // URLの[id]パラメータ

  if (loggedInUserId !== shopId) {
    // アクセス権がない場合、適切なエラーページやリダイレクト
    redirect('/403');
  }

  return <ShopHome />;
}
