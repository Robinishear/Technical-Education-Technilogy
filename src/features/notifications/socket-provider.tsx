"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/core/lib/socket.config"; 

const SocketContext = createContext({
  socket: socket,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Socket Connected! ✅");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket Disconnected! ❌");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};