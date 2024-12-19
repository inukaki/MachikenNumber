import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import { EventNavigation } from '@/components/event/EventNavigation';
import { Toaster } from '@/components/ui/toaster';

export default async function EventLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const session = await getAuthSession();

  if (!session || session.role !== 'event') {
    redirect('/login');
  }

  const loggedInUserId = session.id;
  const eventId = params.id;

  if (loggedInUserId !== eventId) {
    redirect('/403');
  }

  return (
    <div className="min-h-screen pb-16">
      {children}
      <Toaster />
      <EventNavigation />
    </div>
  );
}
