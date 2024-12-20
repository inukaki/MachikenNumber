import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../ui/card';
import React, { ReactNode } from 'react'

interface T {
  children:ReactNode
}

const Yellow = ({children}:T) => {
  const spanCN = `bg-yellow-500 bg-opacity-50 rounded px-1`
  return(
    <span className={spanCN}>
      {children}
    </span>
  )
}

export default function () {
  const lineCN = `m-2 h-1 flex-1 bg-stone-400 rounded-full w-full`
  const h2outerCN = `static min-h-[16rem] w-full overflow-hidden border-b-4 bg-black`
  const h2CN = `absolute text-9xl font-bold text-outline -z-10`
  const h2contCN = `p-4 text-white h-fit min-h-[16rem]` //text-whiteback
  return (
    <>
    <div className="mt-10 item-center">
      <div className="my-2 mb-4">
        <div className={h2outerCN}>
          <h2 className={h2CN}>For<br />Customer</h2>
          <div className={h2contCN}>
            <p>
              このお店ってどのくらい待つんだろう...<br />
              自分って待ち順何番目くらい？
            </p><br />
            <p>
            <Yellow>スマホでサイトにアクセスするだけで、全部解決！？</Yellow>
            </p><br />
            <p>
              「マチケンナンバ」はお店ごとの待ち時間が分かるだけでなく、自分の注文した品物が提供されるまでの想定待ち時間もそれぞれ表示！<br />
              さらに、イベントごとにすべてのお店の待ち時間を一覧で確認できるから、空いているお店を狙い撃ちもできちゃう。<br />
            </p>
          </div>
        </div>
        <div className={h2outerCN}>
          <h2 className={h2CN}>For<br />Host</h2>
          <div className={h2contCN}>
            <p>
            お店の前に長蛇の列...<br />
            どのお客さんに渡すの...？順番は...？<br />
            </p><br />
            <p>
              こんな悩み、<Yellow>「マチケンナンバ」で即解決</Yellow>
            </p><br />
            <p>
            「マチケンナンバ」は”誰が””何を”買ったのかすぐにわかるシステムだから、渡し間違いをなくせるだけでなく、順番や混雑状況も一目瞭然。<br />
            さらに、今の環境をほぼ変えることなく<Yellow>少ない手間で</Yellow>導入可能。<br />
            </p>
          </div>
        </div>
      </div>
      <div className='max-w-[30rem] mx-auto'>
        <Card>
          <CardHeader>
            <CardTitle className='text-center'>
              ショップ・イベントを探す
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Link href="/client">
                  <Button variant="outline" className="w-full">
                    ショップを探す
                  </Button>
                </Link>
                <Link href="/client/events">
                  <Button variant="outline" className="w-full">
                    イベントを探す
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        <div>
          <p className='text-lg font-bold m-2'>ショップ・イベントの管理者ですか？</p>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Link href="/client">
                <Button variant="outline" className="w-full">
                  ショップを登録
                </Button>
              </Link>
              <Link href="/client/events">
                <Button variant="outline" className="w-full">
                  イベントを登録
                </Button>
              </Link>
            </div>
          </div>      
          <div className=' flex items-center justify-center m-1'>
            <div className={lineCN}></div>
            <p>または</p>
            <div className={lineCN}></div>
          </div>
          <div>
            <Link href="/client/events">
              <Button className="w-full">
                ログイン
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}