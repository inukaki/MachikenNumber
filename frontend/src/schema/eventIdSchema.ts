import { z } from 'zod';

export const eventIdSchema = z.object({
  eventId: z.string().min(2, {
    message: 'イベントIDは2文字以上で入力してください',
  }),
});
