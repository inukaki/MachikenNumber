import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <Link href="/signup">
        <Button>利用する</Button>
      </Link>
    </div>
  );
}
