'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式ではありません' }),
});

// 入力データの型を定義
type InputType = z.infer<typeof schema>;

// パスワードリセット
const ForgotPassword = () => {
  const router = useRouter();

  // フォームの状態
  const form = useForm<InputType>({
    // 入力値の検証
    resolver: zodResolver(schema),
    // 初期値
    defaultValues: {
      email: '',
    },
  });

  // パスワード再設定メール送信
  const forgotPassword = async (email: string) => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'メール送信に失敗しました');
      }

      toast.success('パスワード再設定に必要なメールを送信しました');
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    }
  };

  // 送信
  const onSubmit: SubmitHandler<InputType> = (data) => {
    forgotPassword(data.email);
  };

  return (
    <div className="m-auto max-w-[400px]">
      <div className="mb-10 text-center text-2xl font-bold">パスワード再設定</div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input placeholder="xxxx@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            {form.formState.isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
            送信
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;
