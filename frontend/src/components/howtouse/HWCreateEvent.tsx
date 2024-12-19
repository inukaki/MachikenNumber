'use-client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import HWTitle from '@/components/howtouse/HWTitle'

export default function HWCreateEvent({no}:{no:number}){
  return(
    <div>
      <HWTitle no={no}>イベントの初期設定をする</HWTitle>
      <div className="mx-6">
        イベントの名前や説明を入力してください。
      </div>
    </div>
  )
}