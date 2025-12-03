import { z } from 'zod';

export const envSchema = z.object({
  RMQ_URL: z
    .url()
    .refine((url) => url.startsWith('amqp://') || url.startsWith('amqps://'), {
      message: 'RMQ_URL must start with amqp:// or amqps://',
    }),
});

export type EnvSchema = z.infer<typeof envSchema>;
