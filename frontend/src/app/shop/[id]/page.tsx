
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import ShopHome from '@/components/shop/ShopHome';

export default async function ShopDetail({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  // セッションがない場合、ログインページにリダイレクト
  if (!session) {
    redirect('/login');
  }

  // ユーザーIDをチェック
  const loggedInUserId = session.user.id; // セッションに含まれるユーザーID
  const shopId = params.id; // URLの[id]パラメータ

  if (loggedInUserId !== shopId) {
    // アクセス権がない場合、適切なエラーページやリダイレクト
    redirect('/403');
  }

  return <ShopHome />;

}
