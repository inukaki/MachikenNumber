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
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="container flex justify-between items-center py-2 px-1">
        <Link href={`/shop/${shopId}`} passHref>
          <Button
            variant={pathname === `/shop/${shopId}` ? 'default' : 'ghost'}
            className="flex-1 py-8 px-5">
            <Home className="w-5 h-5 mr-2" />
            ホーム
          </Button>
        </Link>
        <Link href={`/shop/${shopId}/order`} passHref>
          <Button
            variant={pathname.includes('/order') ? 'default' : 'ghost'}
            className="flex-1 py-8 px-5">
            <ClipboardList className="w-5 h-5 mr-2" />
            注文
          </Button>
        </Link>
        <Link href={`/shop/${shopId}/createMenu`} passHref>
          <Button
            variant={pathname.includes('/createMenu') ? 'default' : 'ghost'}
            className="flex-1 py-8 px-5">
            <Menu className="w-5 h-5 mr-2" />
            メニュー
          </Button>
        </Link>
      </div>
    </div>
  );
}
