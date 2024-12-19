'use-client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import HWTitle from '@/components/howtouse/HWTitle';
import Tips from '@/components/ui/tips';
export default function HWAddShop({no}:{no:number}){
  return(
    <div>
      <HWTitle no={no}>ショップを追加する</HWTitle>
      <div className="mx-6">
        <p>
          イベントにショップを追加するには、「イベントID」をショップの管理ページで入力する必要があります。<br />
          「イベントID」をショップの管理者に渡して、入力するように依頼をしてください。ショップ管理者がIDを入力するとショップが管理画面に表示されます。
        </p>
        <Tips title={"ショップを非表示にするには？"}>
          ここに記載
        </Tips>
      </div>
    </div>
  )
}