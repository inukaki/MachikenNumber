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
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import Link from 'next/link';

// 入力データの検証ルールを定義
const schema = z.object({
  name: z.string().min(2, { message: '2文字以上入力する必要があります' }),
  email: z.string().email({ message: 'メールアドレスの形式ではありません' }),
  password: z.string().min(8, { message: '8文字以上入力する必要があります' }),
});

// 入力データの型を定義
type InputType = z.infer<typeof schema>;

const Signup = ({ role }: { role: 'shop' | 'event' }) => {
  console.log(role);
  const router = useRouter();

  // フォームの状態
  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleGoogleSignup = async () => {
    try {
      const result = await signIn('google', {
        callbackUrl: `/signup/signup_Google/${role}`,
      });

      if (result?.error) {
        toast.error('Googleアカウントのサインアップに失敗しました');
      }
    } catch (error) {
      toast.error('Googleアカウントのサインアップに失敗しました');
      console.error(error);
    }
  };

  // REST APIを使用したサインアップ
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, role }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || 'アカウント作成に失敗しました');
        return;
      }

      toast.success('アカウントを作成しました!');

      // ログイン
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: `/${role}`,
      });

      router.refresh();
    } catch (error) {
      toast.error('アカウント作成中にエラーが発生しました');
      console.error(error);
    }
  };

  return (
    <div className="m-auto max-w-[400px]">
      <div className="mb-10 text-center text-2xl font-bold">
        {role === 'shop' ? 'お店' : 'イベント'}として新規登録
      </div>

      <Button variant="outline" className="w-full" onClick={handleGoogleSignup}>
        <FcGoogle className="mr-2 size-4" />
        Googleアカウント
      </Button>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background text-muted-foreground px-2">OR</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>名前</FormLabel>
                <FormControl>
                  <Input placeholder="名前" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-sm text-gray-500">
            サインアップすることで、利用規約、プライバシーポリシーに同意したことになります。
          </div>

          <Button type="submit" className="w-full">
            アカウント作成
          </Button>
        </form>
      </Form>

      <div className="mt-5 text-center">
        <Link href="/login" className="text-sm text-blue-500">
          すでにアカウントをお持ちの方
        </Link>
      </div>
    </div>
  );
};

export default Signup;
