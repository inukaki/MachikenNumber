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
    <div className="bg-background border-border fixed inset-x-0 bottom-0 border-t">
      <div className="container flex items-center justify-between px-1 py-2">
        <Link href={`/event/${eventId}`} passHref>
          <Button
            variant={pathname === `/event/${eventId}` ? 'default' : 'ghost'}
            className="flex-1 px-5 py-8">
            <Info className="mr-2 size-5" />
            イベント詳細
          </Button>
        </Link>
        <Link href={`/event/${eventId}/shops`} passHref>
          <Button
            variant={pathname.includes('/shops') ? 'default' : 'ghost'}
            className="flex-1 px-5 py-8">
            <ShoppingBag className="mr-2 size-5" />
            ショップリスト
          </Button>
        </Link>
      </div>
    </div>
  );
}
