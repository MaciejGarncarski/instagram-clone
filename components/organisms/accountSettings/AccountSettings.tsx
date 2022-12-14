import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { IoSettingsSharp } from 'react-icons/io5';

import styles from './accountSettings.module.scss';

import { CancelIcon } from '@/components/atoms/icons/CancelIcon';
import { EditIcon } from '@/components/atoms/icons/EditIcon';
import { Modal } from '@/components/organisms/modal/Modal';

export const AccountSettings = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { supabaseClient } = useSessionContext();
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useUser();

  const handleLogout = async () => {
    supabaseClient.auth.signOut();
    queryClient.removeQueries(['profile', user?.id]);
    await queryClient.invalidateQueries();
    router.push('/');
  };

  const openModal = () => {
    setSettingsOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={openModal} className={styles.settings} type='button'>
        <motion.span animate={settingsOpen ? { rotate: 50 } : {}}>
          <IoSettingsSharp />
        </motion.span>
        <span className='visually-hidden'>{settingsOpen ? 'close settings' : 'open settings'}</span>
      </button>
      {settingsOpen && (
        <Modal setIsOpen={setSettingsOpen}>
          <Modal.Button isFirst variant='red' onClick={handleLogout}>
            <BiLogOut />
            Log out
          </Modal.Button>
          <Modal.Link href='/accounts/edit'>
            <EditIcon />
            edit profile
          </Modal.Link>
          <Modal.Button isLast onClick={() => setSettingsOpen(false)}>
            <CancelIcon />
            cancel
          </Modal.Button>
        </Modal>
      )}
    </>
  );
};
