import { posts, profiles } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { apiClient } from '@/lib/apiClient';

import styles from './search.module.scss';

import { GoBackButton } from '@/components/atoms/goBackButton/GoBackButton';
import { Loader } from '@/components/atoms/loader/Loader';
import { SearchResult } from '@/components/molecules/searchResult/SearchResult';
import { Post as PostComponent } from '@/components/organisms/post/Post';

export const Search = () => {
  const router = useRouter();
  const query = router.query.q;

  const { data, isLoading } = useQuery<Array<posts | profiles>>(
    ['search list', query],
    async () => {
      const { data } = await apiClient.get(`/getSearchResult?q=${query}`);
      return data;
    }
  );

  if (!data || isLoading) {
    return <Loader variant='margins' />;
  }

  return (
    <main id='main'>
      <GoBackButton />
      <div className={styles.container}>
        {data.length === 0 && <p>no results</p>}
        {data.map((result) => {
          if ('author_id' in result) {
            return <PostComponent id={result.id} key={result.id} />;
          }
          if ('profile_id' in result) {
            return <SearchResult data={result} key={result.profile_id} />;
          }
        })}
      </div>
    </main>
  );
};
