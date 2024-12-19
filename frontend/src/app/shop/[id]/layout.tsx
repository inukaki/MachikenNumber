import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import { ShopNavigation } from '@/components/shop/ShopNavigation';

export default async function ShopLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const session = await getAuthSession();

  if (!session || session.role !== 'shop') {
    redirect('/login');
  }

  const loggedInUserId = session.id;
  const shopId = params.id;

  if (loggedInUserId !== shopId) {
    redirect('/403');
  }

  return (
    <div className="min-h-screen pb-16 w-11/12 mx-auto">
      {children}
      <ShopNavigation />
    </div>
  );
}
