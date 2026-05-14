"use client";

import React from 'react';

interface NavbarProps {
  user?: { name: string; role: string } | null;
  onLogout?: () => void;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="w-full bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
      <div className="font-bold text-lg">InnovatEPAM Portal</div>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm">{user.name} ({user.role})</span>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
