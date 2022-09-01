import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <Link href='/api/auth/logout'>log out</Link>
        <h1>eloelo</h1>
      </main>
    </div>
  );
};

export default Home;
