import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { useProfile } from '@/hooks/profile/useProfile';

import styles from './avatarSection.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Loader } from '@/components/atoms/loader/Loader';
import { UserAvatar } from '@/components/molecules/userAvatar/UserAvatar';

import { AvatarModal } from '../modals/avatarModal/AvatarModal';

export const AvatarSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);

  const user = useUser();
  const { data, isLoading } = useProfile();

  const openModal = () => setModalOpen(true);

  const handleChangeProfilePhoto = () => {
    if (!avatarRef.current) {
      return null;
    }
    avatarRef.current.click();
  };

  if (isLoading || !user?.id) {
    return <Loader />;
  }

  return (
    <>
      <motion.section
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className={styles['avatar-section']}
      >
        <div className={styles['avatar-container']}>
          <UserAvatar className={styles.avatar} ref={avatarRef} userID={user.id} editable />
          <div>
            <h2>{data?.full_name}</h2>
            <p>@{data?.username}</p>
          </div>
        </div>

        <div className={styles.buttons}>
          <Button
            type='button'
            className={styles['avatar-button']}
            onClick={handleChangeProfilePhoto}
          >
            {data?.avatar_url ? 'Change' : 'Add'} photo
          </Button>
          {data?.avatar_url && (
            <Button
              type='button'
              className={clsx(styles['avatar-button'], styles['avatar-button--red'])}
              onClick={openModal}
              variant='red'
            >
              Remove photo
            </Button>
          )}
        </div>
      </motion.section>
      <AnimatePresence>
        {modalOpen && <AvatarModal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      </AnimatePresence>
    </>
  );
};
