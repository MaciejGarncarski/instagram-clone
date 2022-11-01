import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { apiClient } from '@/lib/apiClient';
import { Posts } from '@/hooks/posts/useGetPosts';
import { Profile } from '@/hooks/profile/useProfile';

import styles from './search.module.scss';

import { GoBackButton } from '@/components/atoms/goBackButton/GoBackButton';
import { Loader } from '@/components/atoms/loader/Loader';
import { SearchResult } from '@/components/molecules/searchResult/SearchResult';
import { Post } from '@/components/organisms/post/Post';

export const Search = () => {
  const router = useRouter();
  const query = router.query.q;

  const { data } = useQuery<Array<Posts | Profile>>(['search list', query], async () => {
    const { data } = await apiClient.get(`/getSearchResult?q=${query}`);
    return data;
  });

  if (!data) {
    return <Loader />;
  }

  return (
    <main id='main'>
      <GoBackButton />
      <div className={styles.container}>
        {data.map((result) => {
          if ('author_id' in result) {
            return <Post id={result.id} key={result.id} />;
          }
          if ('profile_id' in result) {
            return <SearchResult data={result} key={result.id} />;
          }
        })}
      </div>
    </main>
  );
};
