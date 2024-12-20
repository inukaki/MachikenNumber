'use-client';

import HWLogin from '@/components/howtouse/HWLogin';
import HWCreateEvent from '@/components/howtouse/HWCreateEvent';
import HWAddShop from '@/components/howtouse/HWAddShop';
import Link from 'next/link';
export default function main() {
  return (
    <>
      <h1 className="text-xl font-bold">イベント管理ページの使い方</h1>
      <p>
        ショップの使い方は
        <Link href="/howtouse/shop" className="underline underline-offset-4">
          こちら
        </Link>
      </p>
      <HWLogin no={1} link={{ login: '/event', signup: '/signup' }} />
      <HWCreateEvent no={2} />
      <HWAddShop no={3} />
    </>
  );
}
