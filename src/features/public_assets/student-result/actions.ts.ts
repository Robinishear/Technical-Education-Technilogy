"use server";

import { httpClient } from "@/core/axios/httpClient";

export const getResultByRollAction = async (roll: string) => {
  try {
    const res = await httpClient.get(`/students/result/${roll}`);
    return res.data;
  } catch {
    return null;
  }
};