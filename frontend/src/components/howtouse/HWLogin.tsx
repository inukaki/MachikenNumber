'use-client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import HWTitle from '@/components/howtouse/HWTitle'

interface HWLoginShopsProps {
  no:number
  link:{
    login:string
    signup:string
  }
}

export default function HWLoginShops({no,link}:HWLoginShopsProps){
  return(
    <div>
      <HWTitle no={no}>新規登録・ログインをする</HWTitle>
      <div className="mx-6">
        <p>アカウントを新規登録すると自動的に管理ページ・IDが生成されます。登録が済んでいる方はログインして下さい。</p>
        <div className="flex h-full flex flex-col space-y-3 items-center justify-center p-4">
          <Card className="w-[350px] items-center">
            <CardHeader>
              <CardTitle className="text-center">
                新規登録・ログイン
              </CardTitle>
              <CardDescription className="text-center">
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Link href={link.login}>
                    <Button
                      variant="outline"
                      className="w-full"
                    >
                      <p>ログイン</p>
                    </Button>
                  </Link>
                  <Link href={link.signup}>
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
      </div>
    </div>
  )
}