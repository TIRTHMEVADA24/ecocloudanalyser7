"use client";

import React from "react";
import { Moon, Sun, Download } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { exportToPDF } from "@/lib/exportReport";

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/60 dark:bg-slate-900/60 backdrop-blur-md border-white/20 dark:border-slate-800/50">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex gap-4">
          <h2 className="text-lg font-bold text-gradient hidden sm:inline-block">Dashboard</h2>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <button
            onClick={() => exportToPDF()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
