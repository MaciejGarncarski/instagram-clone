import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { useUser } from '@/hooks/useUser';

import styles from './avatarSection.module.scss';

import { UserAvatar } from '@/components/account/userAvatar/UserAvatar';
import { Loader } from '@/components/loader/Loader';

import { AvatarModal } from './AvatarModal';

export const AvatarSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useUser();

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
    <div className={styles['avatar-container']}>
      <motion.section
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className={styles['avatar-change']}
      >
        <UserAvatar className={styles.avatar} ref={avatarRef} editable />
        <h2>{data?.username ?? 'No username'}</h2>

        <div className={styles.buttons}>
          <button
            type='button'
            className={styles['avatar-button']}
            onClick={handleChangeProfilePhoto}
          >
            Change photo
          </button>
          {data?.avatar_url && (
            <button
              type='button'
              className={clsx(styles['avatar-button'], styles['avatar-button--red'])}
              onClick={openModal}
            >
              Remove photo
            </button>
          )}
        </div>
      </motion.section>
      <AnimatePresence>
        {modalOpen && <AvatarModal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      </AnimatePresence>
    </div>
  );
};
