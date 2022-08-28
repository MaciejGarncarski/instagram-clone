import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type UpdateProfileArgs = {
  username: string;
  bio: string;
  website: string;
  userID: string;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ username, bio, website, userID }: UpdateProfileArgs) => {
      return axios.post('/api/profiles/updateProfile', {
        username: username.trim(),
        bio: bio.trim(),
        website: website.trim(),
        id: userID,
      });
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(['profile']);
      },
    }
  );
};
