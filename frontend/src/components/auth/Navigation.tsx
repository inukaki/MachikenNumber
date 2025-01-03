'use client';

import { Button } from '@/components/ui/button';
import type { User } from '@prisma/client';
import UserNavigation from '@/components/auth/UserNavigation';
import Link from 'next/link';
import HowtouseButton from '../HowtouseButton';
import Image from 'next/image';

interface NavigationProps {
  user: User | null;
}
// ナビゲーション
const Navigation = ({ user }: NavigationProps) => {
  const role = user ? user.role : null;
  return (
    <header className="shadow-lg shadow-gray-100">
      <div className="container mx-auto flex max-w-screen-md items-center justify-between px-2 py-3">
        <Link href="/" className="cursor-pointer text-xl font-bold">
          {/* MachikenNumber */}
          <Image
            src="/logos/textonly/bg-no.svg"
            alt="マチケンナンバ"
            width={256}
            height={64}
            className="h-12 w-auto"
          />
        </Link>
        {user ? (
          <div className="flex flex-row">
            <HowtouseButton type={role} />
            <UserNavigation user={user} />
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <Button asChild variant="ghost" className="font-bold">
              <Link href="/login">ログイン</Link>
            </Button>
            <Button asChild variant="default" className="font-bold">
              <Link href="/signup">新規登録</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
