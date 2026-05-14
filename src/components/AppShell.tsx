"use client";

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from './Navbar';
import { clearSession, getSession, SessionUser } from '../lib/auth';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setUser(getSession());
  }, [pathname]);

  function handleLogout() {
    clearSession();
    setUser(null);
    router.push('/login');
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <main className="pt-4">{children}</main>
    </>
  );
}
