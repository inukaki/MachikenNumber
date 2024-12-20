import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/nextauth';
import Login from '@/components/auth/Login';

// ログインページ
const LoginPage = async () => {
  // 認証情報取得
  const user = await getAuthSession();

  if (user) {
    if (user.role === 'shop') {
      redirect(`/shop/${user.id}`);
    } else if (user.role === 'event') {
      redirect(`/event/${user.id}`);
    }
  }

  return <Login />;
};

export default LoginPage;
