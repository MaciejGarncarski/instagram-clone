import InfiniteScroll from 'react-infinite-scroll-component';

import { useGetPosts } from '@/hooks/posts/useGetPosts';

import styles from './homePage.module.scss';

import { Loader } from '@/components/loader/Loader';
import { Post } from '@/components/post/Post';

export const HomePage = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useGetPosts();
  const allPosts = data?.pages.flatMap((post) => post.post);

  if (isLoading || !data || !allPosts) {
    return <Loader />;
  }

  if (data.pages.length < 1) {
    return <h2>No posts yet.</h2>;
  }

  return (
    <InfiniteScroll
      hasMore={hasNextPage ?? false}
      next={() => fetchNextPage()}
      loader={<Loader />}
      dataLength={allPosts.length}
      style={{ overflow: 'hidden' }}
    >
      <main id='main' className={styles.container}>
        {allPosts.map(({ id }) => {
          return <Post key={id} id={id} />;
        })}
      </main>
    </InfiniteScroll>
  );
};
