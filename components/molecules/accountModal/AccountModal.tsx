import { useAtom } from 'jotai';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './accountModal.module.scss';

import { CloseModalButton } from '@/components/atoms/closeModalButton/CloseModalButton';
import { Loader } from '@/components/atoms/loader/Loader';
import { ModalContainer } from '@/components/atoms/modal/modalContainer/ModalContainer';
import { useFollowers } from '@/components/molecules/accountModal/useFollowers';
import { AccountModalResult } from '@/components/molecules/accountModalResult/AccountModalResult';
import { accountModal } from '@/components/pages/account/Account';

export type AccountModalVariant = 'following' | 'followers';

type AccountModalProps = {
  variant: AccountModalVariant;
  username: string;
};

export const AccountModal = ({ variant, username }: AccountModalProps) => {
  const [, setAccountModal] = useAtom(accountModal);

  const { data, hasNextPage, fetchNextPage } = useFollowers({ username });

  const allData = data?.pages.flatMap((data) => data);

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

  return (
    <ModalContainer className={styles.container} onClose={() => setAccountModal(null)}>
      <CloseModalButton handleClose={() => setAccountModal(null)} />
      <InfiniteScroll
        hasMore={hasNextPage ?? false}
        next={() => fetchNextPage()}
        loader={<Loader />}
        dataLength={allData.length}
        style={{ overflow: 'hidden' }}
      >
        <ul className={styles.list}>
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
        </ul>
      </InfiniteScroll>
    </ModalContainer>
  );
};
