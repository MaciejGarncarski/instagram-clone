import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiEdit, BiLogOut } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { IoSettingsSharp } from 'react-icons/io5';

import styles from './accountSettings.module.scss';

import { Modal } from '@/components/organisms/modal/Modal';

export const AccountSettings = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const handleLogout = async () => {
    supabaseClient.auth.signOut();
    router.push('/');
    queryClient.setQueryData(['profile', user?.id], null);
  };

  return (
    <>
      <button
        onClick={() => setSettingsOpen((prev) => !prev)}
        className={styles.settings}
        type='button'
      >
        <motion.span animate={settingsOpen ? { rotate: 90 } : {}}>
          <IoSettingsSharp />
        </motion.span>
      </button>
      {settingsOpen && (
        <Modal setIsOpen={setSettingsOpen}>
          <Modal.Button variant='red' onClick={handleLogout}>
            <BiLogOut />
            Log out
          </Modal.Button>
          <Modal.Link href='/profile/edit'>
            <BiEdit />
            edit
          </Modal.Link>
          <Modal.Button onClick={() => setSettingsOpen(false)}>
            <CgClose />
            cancel
          </Modal.Button>
        </Modal>
      )}
    </>
  );
};
