import React, { ReactNode } from 'react';

interface SessionProps {
  title: string
  no: number
  children: React.ReactNode
}

const Session = ({title,no,children}:SessionProps) => {
  const titleCN = ``
  return(<>
    <h2 className={titleCN}>{title}</h2>
    <div>{children}</div>
  </>)
}

export function PolicyPopup() {
  return(
    <>
      <Policy />
    </>
  )
}

export default function Policy() {
  return(
    <>
      <h1>プライバシーポリシー</h1>
      <div>
        <h2 className="before:content-['1.'] before:px-2">個人情報等の取得</h2>
        <div>
          ユーザーがショップやイベントを登録する（以下、アカウント登録）とき、メールアドレス、パスワードなどの個人情報を取得させていただきます。<br />
          また、ショップにおける売り上げ等の顧客データにつきましても、サーバーに保管されます。
        </div>
        <h2 className="before:content-['1.'] before:px-2">個人情報等の利用目的</h2>
        <div>
          取得した情報は本サービスの提供にのみ使用します。<br />
        </div>
        <h2 className="before:content-['1.'] before:px-2">個人情報の取得</h2>
        <div>

        </div>
        <h2 className="before:content-['1.'] before:px-2">個人情報の取得</h2>
        <div>
          ただし、次にあげる場合はこの限りではありません。<br />
          <dl>
            <li>法令に基づく場合</li>
            <li>国の機関若しくは地方公共団体、又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
          </dl>
        </div>
      </div>
    </>
  )
}