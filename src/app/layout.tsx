import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mr Robin Ahmed | Vexio LMS",
  description: "Advanced Learning Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning 
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/10 selection:text-primary transition-colors duration-500">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-50">
            <Navbar />
          </div>

          <main className="flex-1 flex flex-col relative overflow-x-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(var(--primary-rgb),0.05)_0%,transparent_100%)]" />
            
            <div className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>

          <Footer />

          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}