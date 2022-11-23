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

  return (
    <main id='main' className={styles.container}>
      {data.pages.map((page) => {
        return page.posts.map(({ id, author_id }) => {
          return <Post key={`${id}, ${author_id}`} id={id} />;
        });
      })}
      {(isLoading || hasNextPage) && (
        <div ref={sentryRef}>
          <Loader />
        </div>
      )}
    </main>
  );
};
