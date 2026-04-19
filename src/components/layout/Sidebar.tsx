"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, BarChart2, Leaf, Zap, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Cost Calculator", href: "/calculator", icon: Calculator },
  { name: "Sustainability", href: "/sustainability", icon: Leaf },
  { name: "Compare Providers", href: "/compare", icon: BarChart2 },
  { name: "Scenarios", href: "/scenarios", icon: Zap },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border-white/20 dark:border-slate-800/50 hidden md:block">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <Leaf className="text-emerald-500" size={24} />
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-400">
            EcoCloud Analyser
          </h1>
        </div>
      </div>
      
      <nav className="p-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <Icon size={18} className={cn(isActive && "text-emerald-500")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto absolute bottom-8 px-6">
        <div className="glass-panel p-4 rounded-xl text-sm">
          <p className="font-medium text-slate-800 dark:text-slate-200 mb-1">PRO Plan Active</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs text-balance">
            Analyzing up to 1M requests per month.
          </p>
        </div>
      </div>
    </aside>
  );
}
