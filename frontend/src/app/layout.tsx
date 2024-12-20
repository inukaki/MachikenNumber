import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/auth/Navigation';
import { getAuthSession } from '@/lib/nextauth';
import AuthProvider from '@/components/providers/AuthProvider';
import ToastProvider from '@/components/providers/ToastProvider';
import { title } from 'process';
import { Description } from '@radix-ui/react-toast';

const inter = Inter({ subsets: ['latin'] });
const meta = {
  title: 'Machiken Number',
  description: 'Machiken Number',
  image: 'https://machiken-number.com/ogp/bg-white.png',
  icon: '/logos/icon/bg-white.svg',
};
export const metadata: Metadata = {
  title: meta.title,
  description: 'Machiken Number',
  openGraph: {
    type: 'website',
    url: 'https://machiken-number.com/',
    title: meta.title,
    description: meta.description,
    siteName: 'MachikenNumber',
    images: [
      {
        url: meta.image,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@site',
    images: meta.image,
  },
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
            <main className="container mx-auto max-w-screen-md flex-1 pt-6 pb-16 px-2">
              {children}
            </main>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
