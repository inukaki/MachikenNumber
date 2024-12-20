'use-client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import HWTitle from '@/components/howtouse/HWTitle'

export default function template({no}:{no:number}){
  return(
    <div>
      <HWTitle no={no}>title</HWTitle>
      <div className="mx-6"></div>
    </div>
  )
}