import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAtom } from 'jotai';

import { userAtom } from '@/store/store';

type Mutation = {
  avatarURL: string;
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const [user] = useAtom(userAtom);

  return useMutation(
    ({ avatarURL }: Mutation) => {
      return axios.post('/api/profiles/updateAvatar', { id: user?.id, avatarURL: avatarURL });
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries([`profile ${user?.id}`]);
      },
    }
  );
};
