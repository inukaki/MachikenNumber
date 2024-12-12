'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EditShopList } from '@/components/event/ShopList';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();
const { id } = useParams();

function sleep(ms:any){
  return new Promise(resolve => setTimeout(resolve, ms));
}

const EventHome = () => {
  const CopyBtn = async (id:any) => {
    const copy:string = id;
    try {
      await navigator.clipboard.writeText(copy);
      toast({
        description: "コピーしました。",
      })
    } catch(error){
      console.log(error);
      toast({
        description: `コピーできませんでした。>error :${error}`,
      })
    }
  }
  return (
    <div>
      <div className="flex h-full items-center justify-center p-4">
        <Card className="w-[350px] items-center">
          <CardHeader>
            <CardTitle>Event ID: {id}</CardTitle>
            <CardDescription />
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={()=>{CopyBtn(id)}}
                >
                  Event IDをコピーする
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <EditShopList
        event_id={id}
      />
      <Toaster />
    </div>
  );
};

export default EventHome;
