"use client";

import React, { useState } from "react";
import { calculateSustainability } from "@/lib/pricingLogic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Lightbulb, Zap, Factory, Car, Smartphone } from "lucide-react";

export default function SustainabilityPage() {
  const [tokens, setTokens] = useState(10000000);

  const { energyKwh, carbonGrams, equivalents } = calculateSustainability(tokens);

  // Growth projection data
  const chartData = [
    { month: "Jan", co2: (carbonGrams * 0.4).toFixed(1) },
    { month: "Feb", co2: (carbonGrams * 0.6).toFixed(1) },
    { month: "Mar", co2: (carbonGrams * 0.9).toFixed(1) },
    { month: "Current", co2: carbonGrams.toFixed(1) },
    { month: "Next (Est)", co2: (carbonGrams * 1.5).toFixed(1) },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sustainability & AI Impact</h1>
        <p className="text-slate-600 dark:text-slate-400">Measure the environmental cost of your LLM tokens and cloud infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="md:col-span-2 lg:col-span-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
          <CardHeader>
            <CardTitle>AI Token Usage Analyzer</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="block text-sm font-medium mb-2">Total Tokens Processed</label>
            <input 
              type="number"
              value={tokens}
              onChange={(e) => setTokens(Number(e.target.value))}
              className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition text-lg font-bold"
            />
            <p className="text-sm mt-2 text-slate-500">Tokens influence computational energy during inference.</p>
          </CardContent>
        </Card>

        {/* Impact Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm flex items-center gap-2"><Zap size={16} /> Energy Consumed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-500">{energyKwh} <span className="text-base text-slate-500 font-normal">kWh</span></p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm flex items-center gap-2"><Factory size={16} /> Carbon Emission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-rose-500">{carbonGrams} <span className="text-base text-slate-500 font-normal">g CO₂</span></p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm flex items-center gap-2"><Car size={16} /> Equivalent to Driving</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-700 dark:text-slate-200">{equivalents.kmDriven} <span className="text-base text-slate-500 font-normal">km</span></p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm flex items-center gap-2"><Smartphone size={16} /> Phones Charged</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-700 dark:text-slate-200">{equivalents.smartphonesCharged} <span className="text-base text-slate-500 font-normal">times</span></p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>CO₂ Trend & Forecasting</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCo2)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Lightbulb className="text-yellow-500" /> Optimization Tips</h3>
          
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition cursor-pointer">
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-400">Implement Semantic Caching</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Saves repeated API queries by caching similar intent requests. Saves up to 20% tokens.</p>
          </div>
          
          <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition cursor-pointer">
            <h4 className="font-semibold text-blue-700 dark:text-blue-400">Use Quantized Models</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Running lighter 8-bit quantized models reduces memory and compute overhead dramatically.</p>
          </div>

          <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 transition cursor-pointer">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400">Batch Processing</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">If using background jobs, batch prompts together for better GPU utilization on the provider side.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
