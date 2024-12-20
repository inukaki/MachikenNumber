import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';

const LoginCard = async () => {
  const session = await getAuthSession();

  // ログイン済みならリダイレクト
  if (session?.role === 'shop') {
    redirect('/shop');
  }
  if (session?.role === 'event') {
    redirect('/event');
  }

  const shop = { login: '/shop', signup: '/signup' };
  const event = { login: '/event', signup: '/signup' };
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-6 p-4">
      <p className="m-2 text-lg font-bold">登録なしで、順番を確認できます！</p>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">ショップ・イベントを探す</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Link href="/client">
                <Button className="w-full text-lg">イベント一覧へ</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      <p className="m-2 my-6 text-lg font-bold">ショップ・イベントの管理者ですか？</p>
      <Card className="w-[350px] items-center">
        <CardHeader>
          <CardTitle className="text-center">ショップ</CardTitle>
          <CardDescription className="text-center">ショップオーナーの方はこちら</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Link href={shop.login}>
                <Button variant="outline" className="w-full">
                  <p>ログイン</p>
                </Button>
              </Link>
              <Link href="/signup/shop">
                <Button className="w-full">
                  <p>新規登録</p>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[350px] items-center">
        <CardHeader>
          <CardTitle className="text-center">イベント</CardTitle>
          <CardDescription className="text-center">イベント管理者の方はこちら</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Link href={event.login}>
                <Button variant="outline" className="w-full">
                  <p>ログイン</p>
                </Button>
              </Link>
              <Link href="/signup/event">
                <Button className="w-full">
                  <p>新規登録</p>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginCard;
