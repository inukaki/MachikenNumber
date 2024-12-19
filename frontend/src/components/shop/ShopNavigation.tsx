'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, ClipboardList, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ShopNavigation() {
  const { id } = useParams();
  const pathname = usePathname();
  const shopId = Array.isArray(id) ? id[0] : id;

  return (
    <div className="bg-background border-border fixed inset-x-0 bottom-0 border-t">
      <div className="container flex items-center justify-between px-1 py-2">
        <Link href={`/shop/${shopId}`} passHref>
          <Button
            variant={pathname === `/shop/${shopId}` ? 'default' : 'ghost'}
            className="flex-1 px-5 py-8">
            <Home className="mr-2 size-5" />
            ホーム
          </Button>
        </Link>
        <Link href={`/shop/${shopId}/order`} passHref>
          <Button
            variant={pathname.includes('/order') ? 'default' : 'ghost'}
            className="flex-1 px-5 py-8">
            <ClipboardList className="mr-2 size-5" />
            注文
          </Button>
        </Link>
        <Link href={`/shop/${shopId}/createMenu`} passHref>
          <Button
            variant={pathname.includes('/createMenu') ? 'default' : 'ghost'}
            className="flex-1 px-5 py-8">
            <Menu className="mr-2 size-5" />
            メニュー
          </Button>
        </Link>
      </div>
    </div>
  );
}
