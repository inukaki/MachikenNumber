import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/nextauth';
import ResetPassword from '@/components/auth/ResetPassword';

interface ResetPasswordProps {
  params: {
    token: string;
  };
}

// パスワード再設定ページ
const ResetPasswordPage = async ({ params }: ResetPasswordProps) => {
  const { token } = params;

  // 認証情報取得
  const user = await getAuthSession();

  if (user) {
    redirect('/');
  }

  // トークンの有効性を判定
  const isValid = await checkResetTokenValidity(token);

  // トークンが無効ならリダイレクト
  if (!isValid) {
    redirect('/reset-password');
  }

  return <ResetPassword token={token} />;
};

// トークン有効性の確認関数
const checkResetTokenValidity = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `/api/auth/validate-reset-token?token=${encodeURIComponent(token)}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error('トークンの確認に失敗しました');
    }

    const data = await response.json();
    return data.isValid;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default ResetPasswordPage;
