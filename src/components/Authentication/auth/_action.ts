/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { setTokenInCookies } from "@/core/utils/tokenUtils";
import { jwtUtils } from "@/core/utils/jwtUtils";
import { getDefaultDashboardRoute } from "@/core/utils/authUtils";
import { redirect } from "next/navigation";
import { api } from "./api";

export const loginUserAction = async (prevState: any, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  let destination = "";

  try {
    const result = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (result.success && result.data) {
      const { accessToken, refreshToken } = result.data;
      await setTokenInCookies("accessToken", accessToken);
      await setTokenInCookies("refreshToken", refreshToken);

      const decoded = jwtUtils.decodedToken(accessToken);
      destination = getDefaultDashboardRoute(decoded?.role);
    }
  } catch (error: any) {
    return { success: false, error: error.message || "Login failed" };
  }

  if (destination) {
    redirect(destination);
  }
};