'use client';

import type { User } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

interface UserNavigationProps {
  user: User;
}

// ユーザーナビゲーション
const UserNavigation = ({ user }: UserNavigationProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative size-10 shrink-0">
          <Image
            src={user.image || '/default.png'}
            className="rounded-full object-cover"
            alt={user.name || 'avatar'}
            fill
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[300px] bg-white p-2" align="end">
        <Link href="/settings/profile">
          <DropdownMenuItem className="cursor-pointer">
            <div className="min-w-0 break-words">
              <div className="mb-2">{user.name || ''}</div>
              <div className="text-gray-500">{user.email || ''}</div>
            </div>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href="/settings/profile">
          <DropdownMenuItem className="cursor-pointer">アカウント設定</DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          onSelect={async (event) => {
            event.preventDefault();
            await signOut({ callbackUrl: '/' });
          }}
          className="cursor-pointer text-red-600">
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavigation;
