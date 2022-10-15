import Link from 'next/link';

import styles from './authRedirect.module.scss';

type AuthRedirectProps = {
  type: 'login' | 'register';
};

type Text = {
  text: string;
  link: string;
};

export const AuthRedirect = ({ type }: AuthRedirectProps) => {
  const loginText: Text = {
    text: 'Not an delaygram user?',
    link: 'Register here',
  };

  const registerText: Text = {
    text: 'Already an delaygram user?',
    link: 'Log in here',
  };

  const information = type === 'login' ? loginText.text : registerText.text;
  const linkText = type === 'login' ? loginText.link : registerText.link;

  const href = type === 'login' ? 'register' : 'login';

  return (
    <div className={styles.container}>
      <p>
        {information}
        <Link href={`/auth/${href}`}>
          <a className={styles.link}>{linkText}</a>
        </Link>
        .
      </p>
    </div>
  );
};
