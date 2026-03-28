import type { Metadata } from "next"; 
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/core/providers/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Love You",
  description: "Advanced Learning Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background antialiased selection:bg-primary/10 selection:text-primary transition-colors duration-500">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
          {children} 
          </ReactQueryProvider>
          
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}