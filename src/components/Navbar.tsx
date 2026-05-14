"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buildLoginRedirectUrl } from '../lib/auth';

interface NavbarProps {
  user?: { name: string; role: string } | null;
  onLogout?: () => void;
}

const publicLinks = [
  { href: '/', label: 'Home' },
  { href: '/login', label: 'Login' },
  { href: '/register', label: 'Register' },
  { href: '/submit-idea', label: 'Submit Idea' },
  { href: '/my-ideas', label: 'My Ideas' },
  { href: '/admin', label: 'Admin Dashboard' },
];

export function Navbar({ user, onLogout }: NavbarProps) {
  const pathname = usePathname();

  function getLinkHref(href: string): string {
    if (user) return href;

    if (href === '/submit-idea') return buildLoginRedirectUrl('/submit-idea', 'submitter');
    if (href === '/my-ideas') return buildLoginRedirectUrl('/my-ideas', 'submitter');
    if (href === '/admin') return buildLoginRedirectUrl('/admin', 'admin');

    return href;
  }

  function linkClassName(href: string) {
    const isActive = pathname === href;
    return isActive
      ? 'inline-flex items-center rounded-xl border border-blue-300 bg-white px-4 py-2 text-sm font-medium text-slate-950 shadow-sm ring-1 ring-blue-200/70'
      : 'inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-950';
  }

  return (
    <nav className="sticky top-0 z-20 w-full border-b border-slate-300/70 bg-white/95 text-slate-900 shadow-[0_8px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <Link href={user?.role === 'admin' ? '/admin' : '/'} className="text-lg font-extrabold tracking-tight text-slate-950">
          InnovatEPAM Portal
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          {publicLinks.map((link) => (
            <Link key={link.href} href={getLinkHref(link.href)} className={linkClassName(link.href)}>
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-inner">
                {user.name} ({user.role})
              </span>
              <button
                onClick={onLogout}
                className="rounded-full bg-rose-500 px-3.5 py-1.5 text-white transition duration-200 hover:-translate-y-0.5 hover:bg-rose-400"
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
