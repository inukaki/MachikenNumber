import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/nextauth';
import prisma from '@/lib/prisma';
const SignupGooglePage = async ({ params }: { params: { role: string } }) => {
  const session = await getAuthSession();

  if (!session) {
    redirect('/');
  }

  await prisma.user.update({
    where: { email: session?.email as string },
    data: { role: params.role as 'client' | 'shop' },
  });

  if (params.role === 'shop') {
    const nestResponse = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}/shops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shop_id: session?.id, name: session?.name }),
    });

    if (!nestResponse.ok) {
      console.error('Nest.jsへの登録に失敗しました');
    }
  }

  if (params.role === 'event') {
    const nestResponse = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event_id: session?.id, name: session?.name }),
    });

    if (!nestResponse.ok) {
      console.error('Nest.jsへの登録に失敗しました');
    }
  }
  redirect('/login');
};

export default SignupGooglePage;
