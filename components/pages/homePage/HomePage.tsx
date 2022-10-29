import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import InfiniteScroll from 'react-infinite-scroll-component';

import { namedComponent } from '@/lib/namedComponent';
import { useGetPosts } from '@/hooks/posts/useGetPosts';

import styles from './homePage.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';

const Post = dynamic(() => {
  return namedComponent(import('@/components/organisms/post/Post'), 'Post');
});

export const HomePage = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useGetPosts();

  if (!data?.pages || isLoading) {
    return <Loader className={styles.loader} />;
  }

  const allPosts = data?.pages.flatMap((post) => post);

  if (allPosts.length < 1) {
    return <h2>No posts yet.</h2>;
  }

  return (
    <InfiniteScroll
      hasMore={hasNextPage ?? false}
      next={() => fetchNextPage()}
      loader={<Loader />}
      dataLength={allPosts.length}
      style={{ overflow: 'hidden' }}
      className={styles.scroller}
    >
      {allPosts && data && (
        <main id='main' className={styles.container}>
          <AnimatePresence>
            {allPosts.map(({ id, author_id }) => {
              return <Post key={`${id}, ${author_id}`} id={id} />;
            })}
          </AnimatePresence>
        </main>
      )}
    </InfiniteScroll>
  );
};
