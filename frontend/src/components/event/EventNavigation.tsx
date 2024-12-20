'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Info, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EventNavigation() {
  const { id } = useParams();
  const pathname = usePathname();
  const eventId = Array.isArray(id) ? id[0] : id;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="container flex justify-between items-center py-2 px-1">
        <Link href={`/event/${eventId}`} passHref>
          <Button
            variant={pathname === `/event/${eventId}` ? 'default' : 'ghost'}
            className="flex-1 py-8 px-5">
            <Info className="w-5 h-5 mr-2" />
            イベント詳細
          </Button>
        </Link>
        <Link href={`/event/${eventId}/shops`} passHref>
          <Button
            variant={pathname.includes('/shops') ? 'default' : 'ghost'}
            className="flex-1 py-8 px-5">
            <ShoppingBag className="w-5 h-5 mr-2" />
            ショップリスト
          </Button>
        </Link>
      </div>
    </div>
  );
}
