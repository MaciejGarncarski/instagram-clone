import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

import { FormValues } from '@/components/editAccount/EditAccount';

type UpdateProfileArgs = FormValues & {
  userID: string;
  profileID: number;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ username, bio, website, userID, profileID }: UpdateProfileArgs) => {
      return apiClient.patch('/profiles/updateProfile', {
        username: username.trim(),
        bio: bio.trim(),
        website: website?.trim(),
        id: userID,
        profile_id: profileID,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profile']);
      },
    }
  );
};
