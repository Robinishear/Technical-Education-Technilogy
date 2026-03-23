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

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};