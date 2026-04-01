/* eslint-disable @typescript-eslint/no-unused-vars */
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = async (
  endpoint: string,
  options?: RequestInit
) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
  
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  let data;
  try { 
    data = await res.json();
  } catch (err ) {
    data = { message: "Unexpected response from server" };
  }

  if (!res.ok) {
      console.log("error data:", data); 
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};