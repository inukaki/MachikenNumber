'use-client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import HWTitle from '@/components/howtouse/HWTitle'

export default function HWCheckOrder({no}:{no:number}){
  return(
    <div>
      <HWTitle no={no}>注文を受ける</HWTitle>
      <div className="mx-6">
        <p>「注文関連」を開くとオーダーを受けるページに遷移します。</p>
        <p>
          注文された商品とその個数を選択します。その後お客様に渡す番号を入力します。<br />
          商品と番号が正しいことを確認し、注文するを押します。
        </p>
        <p>
          ポップアップが表示されたら注文が完了しました。<br />
          注文リストに入力した注文が追加されます。
        </p>
      </div>
    </div>
  )
}