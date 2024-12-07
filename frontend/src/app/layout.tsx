import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/auth/Navigation';
import { getAuthSession } from '@/lib/nextauth';
import AuthProvider from '@/components/providers/AuthProvider';
import ToastProvider from '@/components/providers/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Machiken Number',
  description: 'Machiken Number',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

// レイアウト
const RootLayout = async ({ children }: RootLayoutProps) => {
  // 認証情報取得
  const user = await getAuthSession();

  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <AuthProvider>
            <Navigation user={user} />
            <ToastProvider />
            <main className="container mx-auto max-w-screen-md flex-1 px-2">{children}</main>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
