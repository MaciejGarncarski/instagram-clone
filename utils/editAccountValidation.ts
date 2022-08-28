import { z } from 'zod';

export const username = z
  .string({ required_error: 'Username is required!', invalid_type_error: 'Invalid username!' })
  .min(4, 'Username must contain at least 4 characters!')
  .max(17, 'Username is too long!');

export const website = z.string().max(30);

export const BIO_MAX_LENGTH = 150;

export const bio = z
  .string()
  .max(BIO_MAX_LENGTH, `Your bio is too long! Max characters: ${BIO_MAX_LENGTH}`);
