"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Leaf, BarChart2, CloudRain, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
      {/* Hero Section */}
      <section className="relative glass-card rounded-3xl p-8 sm:p-12 overflow-hidden border-teal-500/20">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Online
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
            Optimize your cloud for a <br className="hidden sm:block" />
            <span className="text-gradient">Sustainable Future</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl">
            EcoTrack Assistant helps you monitor cloud expenditures, compare major providers, and analyze the environmental impact of your AI and cloud operations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/calculator"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-all shadow-lg shadow-emerald-500/25"
            >
              Start Calculating
              <ArrowRight size={18} />
            </Link>
            <Link 
              href="/compare"
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass-panel text-slate-700 dark:text-slate-200 font-medium hover:bg-white/60 dark:hover:bg-slate-800/80 transition-all border border-slate-200 dark:border-slate-700"
            >
              Compare Providers
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Navigation Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/calculator" className="group">
          <Card className="h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:border-emerald-500/50">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <CloudRain size={24} />
              </div>
              <CardTitle>Cloud Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Estimate monthly expenses for compute, storage, and data transfer across top public cloud hosts.
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/sustainability" className="group">
          <Card className="h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:border-emerald-500/50">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                <Leaf size={24} />
              </div>
              <CardTitle>Sustainability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Evaluate the carbon footprint of your AI models and get actionable optimization recommendations.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/scenarios" className="group">
          <Card className="h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:border-emerald-500/50">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <CardTitle>Real-World Scenarios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Simulate application demands like high-traffic E-commerce and scale up to view accurate budget forecasts.
              </p>
            </CardContent>
          </Card>
        </Link>
      </section>
    </div>
  );
}
