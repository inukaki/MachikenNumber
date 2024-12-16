import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/nextauth';
import Link from 'next/link';

const SignupGooglePage = async () => {
  const session = await getAuthSession();

  if (!session || session.role !== null) {
    redirect('/');
  }

  return (
    <div className="flex h-screen flex-col items-center">
      <h1 className="mb-5 text-2xl font-bold">ようこそ、{session.name}さん</h1>
      <p className="text-bold mb-5">あなたのロールを選択してください</p>
      <div className="flex  gap-2">
        <Link
          href="/signup/signup_Google/client"
          className="rounded-md bg-blue-500 px-4 py-2 text-white">
          クライアントでサインアップ
        </Link>
        <Link
          href="/signup/signup_Google/shop"
          className="rounded-md bg-green-500 px-4 py-2 text-white">
          ショップでサインアップ
        </Link>
      </div>
    </div>
  );
};

export default SignupGooglePage;