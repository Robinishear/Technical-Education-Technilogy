/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, User as  Mail, Settings, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProfileContent = ({ user }: { user: any }) => {
  const isUSER = user?.role === "USER";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-4"
    >
      <div className={`relative overflow-hidden rounded-[2.5rem] border bg-card/30 backdrop-blur-3xl shadow-2xl transition-all duration-500 ${isUSER ? 'border-red-500/30 shadow-red-500/10' : 'border-primary/20 shadow-primary/10'}`}>
        
        {/* Animated Background Glow */}
        <div className={`absolute -top-24 -right-24 w-64 h-64 blur-[120px] rounded-full ${isUSER ? 'bg-red-600/20' : 'bg-primary/20'}`} />

        <div className="px-8 py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            
            {/* User Image / Avatar */}
            <div className="relative group">
              <div className={`h-44 w-44 rounded-3xl bg-background p-1.5 shadow-2xl border-2 transition-transform duration-500 group-hover:rotate-3 ${isUSER ? 'border-red-500/50' : 'border-primary/50'}`}>
                <div className="h-full w-full rounded-[1.4rem] bg-secondary flex items-center justify-center overflow-hidden">
                  {user?.image ? (
                    <img src={user.image} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span className={`text-6xl font-black ${isUSER ? 'text-red-500' : 'text-primary'}`}>
                      {user?.name?.charAt(0)}

                    </span>
                  )}
                </div>
              </div>
              {isUSER && (
                <div className="absolute -top-4 -right-4 bg-red-600 text-white p-2 rounded-xl shadow-lg ring-4 ring-background">
                  <Crown size={20} />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4 text-center md:text-left pt-4">
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h1 className="text-4xl font-black tracking-tight">{user?.name}</h1>
                  {isUSER && <ShieldCheck className="h-7 w-7 text-red-500" />}
                </div>
                <p className="text-lg text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                  <Mail className="h-4 w-4" /> {user?.email}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start">
                <span className={`px-5 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest border ${isUSER ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                  {isUSER ? "System USERistrator" : "Standard Member"}
                </span>
                <span className="px-5 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest border bg-secondary/50 text-muted-foreground">
                  ID: {user?.id?.slice(-6) || "N/A"}
                </span>
              </div>
            </div>

            <div className="pt-4">
                <Button className={`rounded-2xl font-bold px-8 py-7 shadow-xl hover:scale-105 transition-all ${isUSER ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary/90'}`}>
                    <Settings className="h-4 w-4 mr-2" /> Account Settings
                </Button>
            </div>
          </div>

          {/* Additional Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <div className="p-6 rounded-[2rem] border bg-background/40 hover:bg-background/60 transition-colors">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Joined Date</p>
              <p className="font-bold text-lg">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="p-6 rounded-[2rem] border bg-background/40 hover:bg-background/60 transition-colors">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Account Security</p>
              <p className="font-bold text-lg text-green-500 flex items-center gap-2">High Security <ShieldCheck size={16}/></p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};