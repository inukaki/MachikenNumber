import { z } from 'zod';

export const menuSchema = z.object({
  name: z.string().min(2, {
    message: '商品名は2文字以上で入力してください',
  }),
  price: z
    .number()
    .min(0)
    .refine((val) => !isNaN(val), {
      message: '価格は0以上で入力してください',
    }),
  time: z.number().min(1, {
    message: '提供時間は1以上で入力してください',
  }),
});
