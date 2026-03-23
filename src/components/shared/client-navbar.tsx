"use client";

import dynamic from "next/dynamic";

const DynamicNavbar = dynamic(() => import("./navbar").then(mod => mod.Navbar), { 
  ssr: false,
  loading: () => <div className="h-16 w-full border-b bg-background/70 backdrop-blur-md" /> 
});

export const ClientNavbar = () => {
  return <DynamicNavbar />;
};