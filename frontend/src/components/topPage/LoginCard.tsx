import Link from 'next/link';
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

const LoginCard = () => {
  const shop = {login:"/shop",signup:"/signup"}
  const event = {login:"/event",signup:"/signup"}
  return (
    <div className="flex h-full flex flex-col space-y-3 items-center justify-center p-4">
      <Card className="w-[350px] items-center">
        <CardHeader>
          <CardTitle className="text-center">
            ショップ
          </CardTitle>
          <CardDescription className="text-center">
            ショップオーナーの方はこちら
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Link href={shop.login}>
                <Button
                  variant="outline"
                  className="w-full"
                >
                  <p>ログイン</p>
                </Button>
              </Link>
              <Link href={shop.signup}>
                <Button
                  variant="outline"
                  className="w-full"
                >
                  <p>新規登録</p>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-[350px] items-center">
        <CardHeader>
          <CardTitle className="text-center">
            イベント
          </CardTitle>
          <CardDescription className="text-center">
            イベント管理者の方はこちら
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Link href={event.login}>
                <Button
                  variant="outline"
                  className="w-full"
                >
                  <p>ログイン</p>
                </Button>
              </Link>
              <Link href={event.signup}>
                <Button
                  variant="outline"
                  className="w-full"
                >
                  <p>新規登録</p>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginCard