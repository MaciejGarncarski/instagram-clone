import { useAtom } from 'jotai';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import styles from './accountModal.module.scss';

import { Loader } from '@/components/atoms/loader/Loader';
import { CloseModalButton } from '@/components/atoms/modal/closeModalButton/CloseModalButton';
import { ModalContainer } from '@/components/atoms/modal/modalContainer/ModalContainer';
import { AccountModalResult } from '@/components/molecules/account/accountModalResult/AccountModalResult';
import { useFollowers } from '@/components/molecules/modals/accountModal/useFollowers';
import { accountModal } from '@/components/pages/account/Account';

export type AccountModalVariant = 'following' | 'followers';

type AccountModalProps = {
  variant: AccountModalVariant;
  userID: string;
};

export const AccountModal = ({ variant, userID }: AccountModalProps) => {
  const [, setAccountModal] = useAtom(accountModal);
  const { data, hasNextPage, fetchNextPage, isLoading } = useFollowers({ userID, variant });
  const allData = data?.pages.flat(Infinity);

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage ? true : false,
    onLoadMore: fetchNextPage,
    disabled: !hasNextPage,
    rootMargin: '0px 0px 50px 0px',
  });

  if (!allData) {
    return null;
  }
  if (allData?.length < 1) {
    return <h2>No posts yet.</h2>;
  }

  const following = allData.map((e) => e.following);

  const followingData = following.flatMap((el) => el);

  const followers = allData.map((e) => e.followers);
  const followersData = followers.flatMap((el) => el);

  const onClose = () => {
    setAccountModal(null);
  };

  return (
    <ModalContainer className={styles.container} onClose={onClose}>
      <CloseModalButton handleClose={onClose} />
      <ul className={styles.list} ref={rootRef}>
        {variant === 'followers' && (
          <>
            {followersData.map((el) => {
              return <AccountModalResult userID={el.from} key={el.id} />;
            })}
          </>
        )}
        {variant === 'following' && (
          <>
            {followingData.map((el) => {
              return <AccountModalResult userID={el.to} key={el.id} />;
            })}
          </>
        )}
        {(isLoading || hasNextPage) && (
          <div ref={sentryRef}>
            <Loader />
          </div>
        )}
      </ul>
    </ModalContainer>
  );
};
