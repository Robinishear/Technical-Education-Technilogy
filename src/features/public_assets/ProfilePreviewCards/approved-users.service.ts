import { httpClient } from "@/core/axios/httpClient";

export const getApprovedUsers = async () => {
  return httpClient.get("/users/approved");
};