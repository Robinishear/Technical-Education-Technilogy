"use client";

import Lottie from "lottie-react";
import aboutAnimation from "@/public/animations/about-us.json";
export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie
        animationData={aboutAnimation}
        loop={true}
        className="w-64 h-64"
      />
    </div>
  );
}