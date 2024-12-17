import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/nextauth';
import Login from '@/components/auth/Login';

// ログインページ
const LoginPage = async () => {
  const session = await getAuthSession();

  // ログイン済みならリダイレクト
  if (session?.id && session.role === 'event') {
    redirect(`/shop/${session.id}`);
  }

  return <Login />;
};

export default LoginPage;
