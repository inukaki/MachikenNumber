'use-client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import HWTitle from '@/components/howtouse/HWTitle'

export default function HWCreateShop({no}:{no:number}){
  return(
    <div>
      <HWTitle no={no}>ショップの初期設定をする</HWTitle>
      <div className="mx-6">
        ショップの名前や説明を入力してください。
      </div>
    </div>
  )
}