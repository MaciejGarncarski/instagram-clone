import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

import styles from './search.module.scss';

export const Search = () => {
  const [input, setInput] = useState<string>('');
  const router = useRouter();

  const onChange = (changeEv: ChangeEvent<HTMLInputElement>) => {
    setInput(changeEv.target.value);
  };

  const onSubmit = (submitEv: FormEvent) => {
    submitEv.preventDefault();
    if (input.trim() === '') {
      setInput('');
      return;
    }
    router.push(`/search?q=${input}`);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <label className={styles.label}>
        <button className={styles.button}>
          <span className='visually-hidden'>Search</span>
          <BiSearch />
        </button>
        <input
          value={input}
          onChange={onChange}
          type='text'
          placeholder='Search...'
          className={styles.input}
        />
      </label>
    </form>
  );
};
