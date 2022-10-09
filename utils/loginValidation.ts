import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must contain at least 6 characters' })
    .max(10, { message: 'Password is too long!' }),
});

export type LoginValues = z.infer<typeof loginSchema>;
