import { z } from 'zod';

export const BIO_MAX_LENGTH = 150;

export const bio = z
  .string()
  .max(BIO_MAX_LENGTH, `Your bio is too long! Max characters: ${BIO_MAX_LENGTH}`);
