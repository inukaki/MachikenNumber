import HWLogin from '@/components/howtouse/HWLogin';
import HWCreateShop from '@/components/howtouse/HWCreateShop';
import HWCreateOrder from '@/components/howtouse/HWCreateOrder';
import HWCheckOrder from '@/components/howtouse/HWCheckOrder';
import HWJoinEvent from '@/components/howtouse/HWJoinEvent';
import Link from 'next/link';
export default function main() {
  return (
    <>
      <h1 className="text-xl font-bold">ショップ管理ページの使い方</h1>
      <p>
        イベントの使い方は
        <Link href="/howtouse/event" className="underline underline-offset-4">
          こちら
        </Link>
      </p>
      <HWLogin no={1} link={{ login: '/shop', signup: '/signup' }} />
      <HWCreateShop no={2} />
      <HWCreateOrder no={3} />
      <HWCheckOrder no={4} />
      <HWJoinEvent no={5} />
    </>
  );
}
