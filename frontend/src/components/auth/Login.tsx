'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
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
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式ではありません' }),
  password: z.string().min(8, { message: '8文字以上入力する必要があります' }),
});

// 入力データの型を定義
type InputType = z.infer<typeof schema>;

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // フォームの状態
  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Googleアカウントでログイン
  const handleGoogleLogin = async () => {
    setIsLoading(true);

    try {
      const result = await signIn('google', { redirect: false });

      if (!result || result.error) {
        throw new Error(result?.error || 'ログインに失敗しました');
      }

      toast.success('Googleアカウントでログインしました!');
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message || 'ログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  // 資格情報でログイン
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!result || result.error) {
        throw new Error(result?.error || 'ログインに失敗しました');
      }

      toast.success('ログインしました!');
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message || 'ログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[400px] m-auto">
      <div className="text-2xl font-bold text-center mb-10">ログイン</div>

      <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isLoading}>
        <FcGoogle className="mr-2 h-4 w-4" />
        Googleアカウント
      </Button>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-muted-foreground">OR</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input placeholder="fullstackchannelinfo@gmail.com" {...field} />
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

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            ログイン
          </Button>
        </form>
      </Form>

      <div className="text-center mt-5">
        <Link href="/reset-password" className="text-sm text-blue-500">
          パスワードを忘れた方はこちら
        </Link>
      </div>
      <div className="text-center mt-2">
        <Link href="/signup" className="text-sm text-blue-500">
          アカウントを作成する
        </Link>
      </div>
    </div>
  );
};

export default Login;