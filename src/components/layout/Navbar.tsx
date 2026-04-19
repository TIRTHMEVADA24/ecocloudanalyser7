"use client";

import React from "react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/60 dark:bg-slate-900/60 backdrop-blur-md border-white/20 dark:border-slate-800/50">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex gap-4">
          <h2 className="text-lg font-bold text-gradient hidden sm:inline-block">Dashboard</h2>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Action buttons removed based on request */}
        </div>
      </div>
    </header>
  );
}
