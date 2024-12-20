import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import prisma from '@/lib/prisma';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

declare module 'next-auth' {
  interface User {
    id: string; // User モデルの ID を追加
  }

  interface Session {
    user: {
      id: string; // セッションの User に ID を追加
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// 環境変数の検証
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Google認証に必要な環境変数が設定されていません');
}

// ユーザー認証ヘルパー関数
async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.hashedPassword) {
    throw new Error('ユーザーが見つからないか、パスワードが設定されていません');
  }

  const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword);

  if (!isCorrectPassword) {
    throw new Error('パスワードが一致しません');
  }

  return user;
}

// NextAuth設定
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('メールアドレスとパスワードを入力してください');
        }
        return authenticateUser(credentials.email, credentials.password);
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        if (session.user) {
          session.user.id = token.sub; // ユーザーIDをセッションに追加
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // JWTトークンにユーザーIDを保存
      }
      return token;
    },
  },
};

// 認証情報取得
export const getAuthSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return null;
  }

  // 1件のレコードを取得、見つからない場合は例外を投げる
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: session.user.email,
    },
  });

  return user;
};
