import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/nextauth';
import Login from '@/components/event-auth/Login';

// ログインページ
const LoginPage = async () => {
  const session = await getAuthSession();

  // ログイン済みならリダイレクト
  if (session?.id) {
    redirect(`/event/${session.id}`);
  }

  return <Login />;
};

export default LoginPage;
