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
const schema = z
  .object({
    password: z.string().min(8, { message: '8文字以上入力する必要があります' }),
    repeatedPassword: z.string().min(8, { message: '8文字以上入力する必要があります' }),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: '新しいパスワードと確認用パスワードが一致しません',
    path: ['repeatedPassword'], // エラーメッセージが適用されるフィールド
  });

// 入力データの型を定義
type InputType = z.infer<typeof schema>;

interface ResetPasswordProps {
  token: string;
}

// パスワード再設定
const ResetPassword = ({ token }: ResetPasswordProps) => {
  const router = useRouter();

  // フォームの状態
  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      repeatedPassword: '',
    },
  });

  // パスワード再設定送信処理
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error('パスワードの再設定に失敗しました');
      }

      toast.success('パスワードを再設定しました');
      router.push('/login');
    } catch (error) {
      toast.error((error as Error).message || 'エラーが発生しました');
      console.error(error);
    }
  };

  return (
    <div className="max-w-[400px] m-auto">
      <div className="text-2xl font-bold text-center mb-10">パスワード再設定</div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>新しいパスワード</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="repeatedPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>新しいパスワード(確認用)</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            送信
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
