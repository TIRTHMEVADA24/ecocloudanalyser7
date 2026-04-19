"use client";

import React, { useState } from "react";
import { calculateCosts, CostBreakdown } from "@/lib/pricingLogic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

export default function CalculatorPage() {
  const [storageGB, setStorageGB] = useState(100);
  const [computeHours, setComputeHours] = useState(730);
  const [transferGB, setTransferGB] = useState(500);

  const costs = calculateCosts(storageGB, computeHours, transferGB);
  const bestProvider = costs.reduce((prev, current) => (prev.totalCost < current.totalCost ? prev : current));

  const pieData = [
    { name: "Storage", value: bestProvider.storageCost },
    { name: "Compute", value: bestProvider.computeCost },
    { name: "Data Transfer", value: bestProvider.transferCost },
  ];
  const COLORS = ["#10b981", "#3b82f6", "#f59e0b"];

  const barData = costs.map(c => ({
    name: c.provider,
    Total: c.totalCost,
    Storage: c.storageCost,
    Compute: c.computeCost,
    Transfer: c.transferCost,
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <div>
        <h1 className="text-3xl font-bold mb-2">Cloud Cost Calculator</h1>
        <p className="text-slate-600 dark:text-slate-400">Estimate your monthly cloud computing expenses across different providers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Resource Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Storage (GB / month)</label>
              <input 
                type="number"
                value={storageGB}
                onChange={(e) => setStorageGB(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Compute (Hours / month)</label>
              <input 
                type="number"
                value={computeHours}
                onChange={(e) => setComputeHours(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Data Transfer (GB)</label>
              <input 
                type="number"
                value={transferGB}
                onChange={(e) => setTransferGB(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              />
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {costs.map((cost) => (
              <Card key={cost.provider} className={cost.provider === bestProvider.provider ? "ring-2 ring-emerald-500 scale-[1.02] shadow-emerald-500/20" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {cost.provider}
                    {cost.provider === bestProvider.provider && <span className="text-xs bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-full">Top Pick</span>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">${cost.totalCost}</p>
                  <p className="text-xs text-slate-500 mt-1">/ month</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-slate-600 dark:text-slate-300">Cost Breakdown ({bestProvider.provider})</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base text-slate-600 dark:text-slate-300">Provider Comparison</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" opacity={0.2} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
                    <Bar dataKey="Total" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
