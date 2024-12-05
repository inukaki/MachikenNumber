'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
    Form,
    FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
    name: z.string().min(2, {
        message: '商品名は2文字以上で入力してください',
    }),
    price: z.number().min(0, {
        message: '価格は0以上で入力してください',
    }),
    time: z.number().min(1, {
        message: '提供時間は1以上で入力してください',
    }),
});

export default function CreateMenu() {
    const [sliderValue, setSliderValue] = useState(5);
    const { id } = useParams();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            price: 300,
            time: 5,
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const res = await fetch(`/api/shop/${id}/menu`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, shopId: id }),
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex h-full items-center justify-center p-4">
            <Card className="w-[420px]">
                <CardHeader>
                    <CardTitle>メニューの追加登録</CardTitle>
                    <CardDescription>
                        以下の情報を入力してメニューを追加してください
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>商品名</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-4/5"
                                                placeholder="焼きそば"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            トッピングは商品名に含めてください
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>価格</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center space-x-2">
                                                <Input className="w-4/5" type="number" {...field} />
                                                <span>円/単価</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>予想提供時間</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center space-x-4">
                                                <Slider
                                                    defaultValue={[field.value]}
                                                    max={20}
                                                    step={1}
                                                    className={cn('w-[80%]')}
                                                    onValueChange={(value) => {
                                                        field.onChange(value[0]);
                                                        setSliderValue(value[0]);
                                                    }}
                                                />
                                                <span>{sliderValue}分</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">登録</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
