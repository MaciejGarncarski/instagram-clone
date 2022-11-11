import { z } from 'zod';

export const password = z
  .string()
  .min(6, { message: 'Password must contain at least 6 characters' })
  .max(25, { message: 'Password is too long!' });

export const loginSchema = z.object({
  email: z.string().email(),
  password,
});

export type LoginValues = z.infer<typeof loginSchema>;
