import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <Link href="/signup">
          <Button>利用する</Button>
        </Link>
      </div>
      <div className="m-5 flex items-center justify-center">
        <Link href="/client">
          <Button>お客様の方はこちら</Button>
        </Link>
      </div>
    </div>
  );
}
