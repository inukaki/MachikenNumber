'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/hooks/use-toast';

const EventHome = ({ event_id }: { event_id: string }) => {
  const copyEventId = () => {
    try {
      navigator.clipboard.writeText(event_id);
      toast({
        description: 'イベントIDをコピーしました。',
      });
    } catch (error) {
      console.error(error);
      toast({
        description: 'コピーに失敗しました。',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>イベント管理</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">イベントID: {event_id}</p>
          <Button onClick={copyEventId}>イベントIDをコピー</Button>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  );
};

export default EventHome;
