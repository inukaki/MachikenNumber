import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import EventHome from '@/components/event/EventHome';

export default async function ShopDetail({ params }: { params: { id: string } }) {
  const session = await getAuthSession();
  // セッションがない場合、ログインページにリダイレクト
  if (!session || session.role !== 'event') {
    redirect('/login');
  }

  // ユーザーIDをチェック
  const loggedInUserId = session.id; // セッションに含まれるユーザーID
  const event_id = params.id; // URLの[id]パラメータ

  if (loggedInUserId !== event_id) {
    // アクセス権がない場合、適切なエラーページやリダイレクト
    redirect('/403');
  }
  return <EventHome event_id={event_id} />;
}
