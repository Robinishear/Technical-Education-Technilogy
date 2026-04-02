import { httpClient } from "@/core/axios/httpClient";

export const sendContactMessage = async (data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) => {
  return httpClient.post("/contact", data);
};