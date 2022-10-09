import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must contain at least 6 characters' })
    .max(10, { message: 'Password is too long!' }),
  fullName: z.string().min(2),
  username: z.string(),
});

export type RegisterValues = z.infer<typeof registerSchema>;
