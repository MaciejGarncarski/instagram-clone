import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useGetPosts } from '@/hooks/posts/useGetPosts';

import styles from './homePage.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';
import { Post } from '@/components/organisms/post/Post';

export const HomePage = () => {
  const { data, isError, isLoading, hasNextPage, fetchNextPage } = useGetPosts();
  const { isFallback } = useRouter();

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage ? true : false,
    onLoadMore: fetchNextPage,
    disabled: isError,
    rootMargin: '0px 0px 600px 0px',
  });

  if (!data?.pages || isLoading || isFallback) {
    return <Loader className={styles.loader} />;
  }

  const allPosts = data.pages.flatMap((el) => el.posts);

  if (allPosts.length < 1) {
    return <h2>No posts yet.</h2>;
  }

  return (
    <main id='main' className={styles.container}>
      {allPosts && data && (
        <AnimatePresence>
          {allPosts.map(({ id, author_id }) => {
            return <Post key={`${id}, ${author_id}`} id={id} />;
          })}
        </AnimatePresence>
      )}
      {(isLoading || hasNextPage) && (
        <div ref={sentryRef}>
          <Loader />
        </div>
      )}
    </main>
  );
};
