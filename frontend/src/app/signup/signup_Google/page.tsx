import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";

const SignupGooglePage = async () => {
  const session = await getAuthSession();

  if (!session || session.role !== null) {
    redirect("/");
  }

  return (
    <div className='flex flex-col items-center h-screen'>
      <h1 className='text-2xl font-bold mb-5'>ようこそ、{session.name}さん</h1>
      <p className='text-bold mb-5'>あなたのロールを選択してください</p>
      <div className='flex  gap-2'>
        <Link
          href={`/signup/signup_Google/client`}
          className='bg-blue-500 text-white px-4 py-2 rounded-md'
        >
          クライアントでサインアップ
        </Link>
        <Link
          href={`/signup/signup_Google/shop`}
          className='bg-green-500 text-white px-4 py-2 rounded-md'
        >
          ショップでサインアップ
        </Link>
      </div>
    </div>
  );
};

export default SignupGooglePage;
