import Link from 'next/link';
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import LoginCard from '@/components/topPage/LoginCard';
export default function Home() {
  return (
    <div>
      {/* <h1>Home</h1>
      <p>Home page</p> */}
      <LoginCard />
    </div>
  );
}
