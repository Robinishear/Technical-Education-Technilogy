export const api = async (endpoint: string, options?: RequestInit) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
    ...options,
  });

  const text = await res.text();
  
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};