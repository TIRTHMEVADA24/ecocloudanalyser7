import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoCloud Analyser",
  description: "Cloud Cost Calculator and Sustainability Monitor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans antialiased`} id="dashboard-content">
        <ThemeProvider defaultTheme="system" enableSystem>
          <div className="flex bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative overflow-hidden">
              {/* Background gradient effects */}
              <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
              <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
              
              <Navbar />
              <main className="flex-1 container py-8 px-4 sm:px-8 relative z-10 w-full overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
