import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { useProfile } from '@/hooks/useProfile';

import styles from './avatarSection.module.scss';

import { UserAvatar } from '@/components/account/userAvatar/UserAvatar';
import { Button } from '@/components/common/button/Button';
import { Loader } from '@/components/loader/Loader';

import { AvatarModal } from './AvatarModal';

export const AvatarSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useProfile();

  const openModal = () => setModalOpen(true);

  const handleChangeProfilePhoto = () => {
    if (!avatarRef.current) {
      return null;
    }
    avatarRef.current.click();
  };

  if (isLoading) {
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
          <UserAvatar className={styles.avatar} ref={avatarRef} editable />
          <h2>{data?.username ?? 'No username'}</h2>
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
            >
              Remove photo
            </Button>
          )}
        </div>
      </motion.section>
      <AnimatePresence>{modalOpen && <AvatarModal setModalOpen={setModalOpen} />}</AnimatePresence>
    </>
  );
};
