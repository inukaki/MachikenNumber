import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MenuEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editId: string | null;
}

export function MenuEditModal({ open, onOpenChange, editId }: MenuEditModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>プロフィール編集</DialogTitle>
          <DialogDescription>
            ここでプロフィールの変更ができます。完了したら保存をクリックしてください。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              名前
            </Label>
            <Input id="name" defaultValue="山田太郎" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              ユーザー名
            </Label>
            <Input id="username" defaultValue="@yamada" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => onOpenChange(false)}>
            変更を保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
