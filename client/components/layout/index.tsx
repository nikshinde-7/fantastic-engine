// components/layout.js
import type { NextPage } from 'next';
import Link from 'next/link';
import { useAuth } from '../../context/state';

interface IProps {
  children: any;
}

export default function Layout({ children }: IProps) {
  const { user, login, logout } = useAuth();
  return (
    <div id={'nav'}>
      <Link href={'/'}>
        <button id={'nav-home'}>Home</button>
      </Link>
      {!user && (
        <>
          <Link href={'/signUp'}>
            <button id={'nav-signup'}>Sign Up</button>
          </Link>
          <Link href={'/login'}>
            <button>Login</button>
          </Link>{' '}
        </>
      )}
      {user && (
        <>
          <Link href={'/dashboard'}>
            <button>Dashboard</button>
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
      <main>{children}</main>
    </div>
  );
}
