// components/layout.js
import type { NextPage } from 'next';
import Link from 'next/link';

interface IProps {
  children: any;
  token: string | undefined;
  logout: () => void;
}

export default function Layout({ children, token, logout }: IProps) {
  // const token = localStorage.getItem('token');
  return (
    <>
      <Link href={'/'}>
        <button>Home</button>
      </Link>
      {!token && (
        <>
          <Link href={'/signUp'}>
            <button>Sign Up</button>
          </Link>
          <Link href={'/login'}>
            <button>Login</button>
          </Link>{' '}
        </>
      )}
      {token && (
        <>
          <Link href={'/dashboard'}>
            <button>Dashboard</button>
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
      <main>{children}</main>
    </>
  );
}
