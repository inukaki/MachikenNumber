import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function home() {
  return (
    <div className="w-full">
      <Card className="item-center mx-auto max-w-[30rem] text-center">
        <CardHeader>
          <CardTitle>使い方を確認する</CardTitle>
          <CardDescription>使い方・機能などを確認できます。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p>
              <Link href="/howtouse/shop">
                <Button variant="outline">ショップの使い方</Button>
              </Link>
            </p>
            <p>
              <Link href="/howtouse/event">
                <Button variant="outline">イベントの使い方</Button>
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
