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
  redirect('/login');
};

export default SignupGooglePage;
