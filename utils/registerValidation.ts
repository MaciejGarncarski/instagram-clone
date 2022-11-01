import { z } from 'zod';

const usernameRegExp = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;
const nonLowercaseLettersRegExp = /^[a-z]+$/g;

const fullNameRegExp =
  /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;

export const fullName = z
  .string()
  .trim()
  .regex(fullNameRegExp, { message: 'Enter valid name and surname' });

export const username = z
  .string()
  .min(2)
  .regex(usernameRegExp, { message: 'Invalid characters in username' })
  .regex(nonLowercaseLettersRegExp, {
    message: 'Username should contain lowercase letters only!',
  });

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must contain at least 6 characters' })
    .max(10, { message: 'Password is too long!' }),
  fullName,
  username,
});

export type RegisterValues = z.infer<typeof registerSchema>;
