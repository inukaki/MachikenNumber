'use-client'

import React, {ReactNode} from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface TipsProps{
  title: string
  children: React.ReactNode
}
export default function Tips({title,children}:TipsProps){
  const titleCN = `
    before:content-[url("data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic3ZnLWljb24iIHN0eWxlPSJ3aWR0aDogMWVtOyBoZWlnaHQ6IDFlbTt2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO2ZpbGw6IGN1cnJlbnRDb2xvcjtvdmVyZmxvdzogaGlkZGVuOyIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik05MDguOCAzMDMuNmMtNS40LTEwLjUtMTYuMy0xNy44LTI4LjktMTcuOC0xNy44IDAtMzIuMiAxNC40LTMyLjIgMzIuMSAwIDYgMS43IDExLjcgNC42IDE2LjVsLTAuMSAwLjFjMjYuOSA1Mi40IDQyLjEgMTExLjggNDIuMSAxNzQuNyAwIDIxMS42LTE3MS42IDM4My4yLTM4My4yIDM4My4yUzEyNy44IDcyMC44IDEyNy44IDUwOS4yIDI5OS40IDEyNi4xIDUxMSAxMjYuMWM2Mi41IDAgMTIxLjUgMTUgMTczLjYgNDEuNWwwLjItMC40YzQuNiAyLjYgMTAgNC4xIDE1LjcgNC4xIDE3LjggMCAzMi4yLTE0LjQgMzIuMi0zMi4xIDAtMTMuMS03LjktMjQuNC0xOS4zLTI5LjRDNjUyLjYgNzguOSA1ODMuOSA2MS41IDUxMSA2MS41IDI2My43IDYxLjUgNjMuMiAyNjIgNjMuMiA1MDkuMlMyNjMuNyA5NTYuOSA1MTEgOTU2LjlzNDQ3LjctMjAwLjQgNDQ3LjctNDQ3LjdjMC03NC4xLTE4LTE0NC00OS45LTIwNS42eiIgZmlsbD0iIzAwMCIgLz48cGF0aCBkPSJNNzcwLjcgMjE3LjdhMzIuMiAzMi4xIDAgMSAwIDY0LjQgMCAzMi4yIDMyLjEgMCAxIDAtNjQuNCAwWiIgZmlsbD0iIzAwMCIgLz48cGF0aCBkPSJNNDgyLjggNjk5LjZhMzIuMiAzMi4xIDAgMSAwIDY0LjQgMCAzMi4yIDMyLjEgMCAxIDAtNjQuNCAwWiIgZmlsbD0iIzAwMCIgLz48cGF0aCBkPSJNNTE1IDYwMy41YzE3LjYgMCAzMS45LTE0LjQgMzEuOS0zMS45VjMxNS45YzAtMTcuNS0xNC4zLTMxLjktMzEuOS0zMS45LTE3LjUgMC0zMS45IDE0LjMtMzEuOSAzMS45djI1NS43YzAgMTcuNSAxNC4zIDMxLjkgMzEuOSAzMS45eiIgZmlsbD0iIzAwMCIgLz48L3N2Zz4=")]
    before:block before:h-full before:aspect-square before:absolute before:top-0 before:left-0 before:-translate-1/2
    relative w-full h-8 flex items-center pl-10
    `;
  const childCN = ``;
  return(
    <div className='my-4 mx-2 lg:mx-8'>
      <Card>
        <CardHeader>
          <CardTitle className={titleCN}>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={childCN}>
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}