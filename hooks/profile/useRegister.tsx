import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';
import { RegisterValues } from '@/utils/registerValidation';

type RegisterMutation = {
  id: string;
} & Pick<RegisterValues, 'username' | 'fullName'>;

export const useRegister = () => {
  return useMutation(async ({ username, fullName, id }: RegisterMutation) => {
    return apiClient.post('/accounts/register', {
      id,
      username: username.trim(),
      fullName: fullName.trim(),
    });
  });
};
