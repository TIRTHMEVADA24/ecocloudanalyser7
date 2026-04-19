"use client";

import React, { useState } from "react";
import { calculateCosts } from "@/lib/pricingLogic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ShoppingCart, Users, Database, Globe } from "lucide-react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ScenariosPage() {
  const [trafficScale, setTrafficScale] = useState(1);

  // Simulated mapping from traffic multiplier to infrastructure needs
  const storageNeeded = Math.round(100 * trafficScale * 1.5);
  const computeNeeded = Math.round(730 * Math.max(1, (trafficScale * 0.8))); // At least 1 instance (730h), scales up
  const transferNeeded = Math.round(500 * trafficScale * 2);

  const costs = calculateCosts(storageNeeded, computeNeeded, transferNeeded);
  const bestProvider = costs.reduce((prev, current) => (prev.totalCost < current.totalCost ? prev : current));

  // Generate some scale growth data to visualize
  const growthData = Array.from({ length: 6 }).map((_, i) => {
    const scale = trafficScale * (1 + (i * 0.2));
    const pointCost = calculateCosts(
      Math.round(100 * scale * 1.5),
      Math.round(730 * Math.max(1, (scale * 0.8))),
      Math.round(500 * scale * 2)
    ).find(c => c.provider === bestProvider.provider)?.totalCost || 0;

    return {
      month: `M+${i}`,
      cost: pointCost
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <div>
        <h1 className="text-3xl font-bold mb-2">Real-world Scenario Simulation</h1>
        <p className="text-slate-600 dark:text-slate-400">Scale an E-commerce application architecture and view dynamic cost projections.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="text-indigo-500" /> E-commerce Platform
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <p className="text-sm text-slate-500">
                Adjust the sliding scale below to simulate traffic spikes, marketing campaigns, or long-term business growth.
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium pr-1">
                  <span>Current Traffic Level</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{Math.round(trafficScale * 10)}k Daily Users</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="10" 
                  step="0.5"
                  value={trafficScale}
                  onChange={(e) => setTrafficScale(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-slate-400 px-1 pt-1">
                  <span>Startup</span>
                  <span>Enterprise</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                  <Database size={20} className="mx-auto mb-2 text-slate-400" />
                  <p className="text-xs text-slate-500 mb-1">Storage</p>
                  <p className="font-bold">{storageNeeded} GB</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                  <Users size={20} className="mx-auto mb-2 text-slate-400" />
                  <p className="text-xs text-slate-500 mb-1">Compute</p>
                  <p className="font-bold">{computeNeeded} hrs</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                  <Globe size={20} className="mx-auto mb-2 text-slate-400" />
                  <p className="text-xs text-slate-500 mb-1">Bandwidth</p>
                  <p className="font-bold">{transferNeeded} GB</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forecasted Runway</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip />
                <Area type="monotone" dataKey="cost" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {costs.map((cost) => (
          <Card key={cost.provider} className={cost.provider === bestProvider.provider ? "ring-2 ring-indigo-500" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-600 dark:text-slate-400">{cost.provider} Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${cost.totalCost}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
