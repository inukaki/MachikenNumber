import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '@/components/auth/Footer';

export default function Home() {
  return (
    <div className="mt-10">
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
      <Footer />
    </div>
  );
}
