import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

import { FormValues } from '@/components/pages/editAccount/EditAccount';

type UpdateProfileArgs = FormValues & {
  userID: string;
  profileID: number;
};

export const useUpdateProfile = () => {
  return useMutation(async ({ username, bio, website, userID, profileID }: UpdateProfileArgs) => {
    return apiClient.patch('/accounts/updateProfile', {
      username: username.trim(),
      bio: bio.trim(),
      website: website?.trim(),
      id: userID,
      profile_id: profileID,
    });
  });
};
