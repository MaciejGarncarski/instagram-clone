import Link from 'next/link';

import styles from './anotherAuthOption.module.scss';

type AnotherAuthOptionProps = {
  type: 'login' | 'register';
};

type Text = {
  text: string;
  link: string;
};

export const AnotherAuthOption = ({ type }: AnotherAuthOptionProps) => {
  const loginText: Text = {
    text: 'Not an delayedgram user?',
    link: 'Register here',
  };

  const registerText: Text = {
    text: 'Already an delayedgram user?',
    link: 'Login here',
  };

  const information = type === 'login' ? loginText.text : registerText.text;
  const linkText = type === 'login' ? loginText.link : registerText.link;

  const href = type === 'login' ? 'register' : 'login';

  return (
    <div className={styles.container}>
      <h3>{information}</h3>
      <Link href={`/auth/${href}`}>
        <a className={styles.link}>{linkText}</a>
      </Link>
    </div>
  );
};
