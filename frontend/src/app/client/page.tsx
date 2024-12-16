import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';

export default async function Client() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Link href="/client/events" as="/client/events">
        <Button>イベントを選ぶ</Button>
      </Link>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">店舗を選ぶ</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>店舗を選んでください</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">店舗ID</Label>
            <Input className="col-span-3" />
          </div>
          <DialogFooter>
            <Link href="/client/[shop_id]" as="/client/[shop_id]">
              <Button type="submit">検索する</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
