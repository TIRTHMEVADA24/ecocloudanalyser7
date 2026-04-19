"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const performanceData = [
  { subject: "Scalability", AWS: 95, Azure: 85, GCP: 90, fullMark: 100 },
  { subject: "Pricing", AWS: 70, Azure: 80, GCP: 85, fullMark: 100 },
  { subject: "AI Services", AWS: 85, Azure: 95, GCP: 90, fullMark: 100 },
  { subject: "Global Reach", AWS: 98, Azure: 90, GCP: 80, fullMark: 100 },
  { subject: "Ease of Use", AWS: 75, Azure: 70, GCP: 85, fullMark: 100 },
];

const satisfactionData = [
  { name: "2020", AWS: 85, Azure: 80, GCP: 75 },
  { name: "2021", AWS: 86, Azure: 82, GCP: 78 },
  { name: "2022", AWS: 84, Azure: 85, GCP: 82 },
  { name: "2023", AWS: 88, Azure: 86, GCP: 85 },
  { name: "2024", AWS: 89, Azure: 88, GCP: 89 },
];

export default function ComparePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <div>
        <h1 className="text-3xl font-bold mb-2">Cloud Comparison Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Evaluate major cloud providers across multiple enterprise metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart for Capability Profiling */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
            <CardTitle>Provider Capability Profile</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={performanceData}>
                <PolarGrid opacity={0.3} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="AWS" dataKey="AWS" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                <Radar name="Azure" dataKey="Azure" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                <Radar name="GCP" dataKey="GCP" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                <Legend iconType="circle" />
                <Tooltip cursor={{fill: 'transparent'}}/>
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart for Consumer Satisfaction Over Time */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
            <CardTitle>Enterprise Satisfaction Shift (2020-2024)</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={satisfactionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
                <Legend iconType="circle" />
                <Bar dataKey="AWS" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Azure" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="GCP" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-t-4 border-t-[#f59e0b]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-[#f59e0b]/20 flex items-center justify-center font-bold text-[#f59e0b]">A</span>
              Standard AWS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400">Dominant market share with the most exhaustive list of services. Can be slightly more complex and expensive if not optimized.</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[#3b82f6]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-[#3b82f6]/20 flex items-center justify-center font-bold text-[#3b82f6]">M</span>
              Microsoft Azure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400">Excellent hybrid cloud capabilities and seamless Windows/Active Directory integrations. Strong AI integration via OpenAI.</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[#10b981]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-[#10b981]/20 flex items-center justify-center font-bold text-[#10b981]">G</span>
              Google Cloud
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400">Highly favored for big data computation, machine learning pipelines, and often features competitive compute pricing.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
