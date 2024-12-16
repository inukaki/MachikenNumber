import Link from 'next/link'

export default function home() {
  return(
    <>
      <p>
        <Link href="/howtouse/shop">
          ショップの使い方
        </Link>
      </p>
      <p>
        <Link href="/howtouse/event">
          イベントの使い方
        </Link>
      </p>
    </>
  )
}