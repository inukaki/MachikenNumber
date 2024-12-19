'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface EventDetails {
  event_id: string;
  name: string;
  start_at: string;
  end_at: string;
  description: string;
}

export default function EventDetails({ event_id }: { event_id: string }) {
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [editedDetails, setEditedDetails] = useState<EventDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchEventDetails();
  }, [event_id]);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/events/${event_id}`);
      if (!response.ok) throw new Error('イベント詳細の取得に失敗しました');
      const data = await response.json();
      setEventDetails(data);
      setEditedDetails(data);
    } catch (error) {
      console.error('Error fetching event details:', error);
      toast({
        title: 'エラー',
        description: 'イベント詳細の取得に失敗しました',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedDetails((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedDetails) return;

    try {
      const response = await fetch(`http://localhost:3001/events/${event_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editedDetails.name,
          start_at: editedDetails.start_at,
          end_at: editedDetails.end_at,
          description: editedDetails.description,
        }),
      });

      if (!response.ok) throw new Error('イベントの更新に失敗しました');

      toast({
        title: '成功',
        description: 'イベントが更新されました',
      });
      setEventDetails(editedDetails);
      router.refresh();
    } catch (error) {
      console.error('Error updating event:', error);
      toast({
        title: 'エラー',
        description: 'イベントの更新に失敗しました',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    setEditedDetails(eventDetails);
  };

  if (!eventDetails) return <div>読み込み中...</div>;

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>イベント詳細</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              イベント名
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={editedDetails?.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="start_at" className="block text-sm font-medium text-gray-700">
              開始日時
            </label>
            <Input
              type="datetime-local"
              id="start_at"
              name="start_at"
              value={editedDetails?.start_at?.slice(0, 16)}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="end_at" className="block text-sm font-medium text-gray-700">
              終了日時
            </label>
            <Input
              type="datetime-local"
              id="end_at"
              name="end_at"
              value={editedDetails?.end_at?.slice(0, 16)}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              説明
            </label>
            <Textarea
              id="description"
              name="description"
              value={editedDetails?.description}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit">保存</Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              キャンセル
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
