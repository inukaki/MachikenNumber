import ShopHome from '@/components/shop/ShopHome';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';

export default async function ShopDetail({ params }: { params: { id: string } }) {
  const session = await getAuthSession();

  if (!session || session.role !== 'shop') {
    redirect('/login');
  }

  const loggedInUserId = session.id;
  const shopId = params.id;

  if (loggedInUserId !== shopId) {
    redirect('/403');
  }

  return <ShopHome user={session} />;
}
