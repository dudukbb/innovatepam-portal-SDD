"use client";

import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  user?: { name: string; role: string } | null;
  onLogout?: () => void;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-20 w-full border-b border-slate-700 bg-slate-900 text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href={user?.role === 'admin' ? '/admin' : '/dashboard'} className="font-bold text-lg">
          InnovatEPAM Portal
        </Link>
        <div className="flex items-center gap-4 text-sm">
        {user && (
          <>
            <Link href="/dashboard" className="text-slate-200 transition hover:text-white">
              Dashboard
            </Link>
            {user.role === 'submitter' ? (
              <Link href="/submit" className="text-slate-200 transition hover:text-white">
                Submit Idea
              </Link>
            ) : null}
            {user.role === 'admin' ? (
              <Link href="/admin" className="text-slate-200 transition hover:text-white">
                Admin
              </Link>
            ) : null}
            <span className="hidden text-slate-300 sm:inline">{user.name} ({user.role})</span>
            <button
              onClick={onLogout}
              className="rounded-md bg-rose-500 px-3 py-1 text-white transition hover:bg-rose-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
      </div>
    </nav>
  );
}
