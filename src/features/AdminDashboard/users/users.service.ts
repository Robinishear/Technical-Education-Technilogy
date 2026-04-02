import { httpClient } from "@/core/axios/httpClient";
import { IUser } from "./users.types";

// export const getAllUsers = async () => {
//   return httpClient.get<IUser[]>("/users");
// };

export const getAllUsers = async (search?: string) => {
  const params = search ? { search } : {};
  return httpClient.get<IUser[]>("/users", { params });
};

export const approveUser = async (userId: string) => {
  return httpClient.patch<IUser>(`/users/${userId}/approve`, {});
};

export const blockUser = async (userId: string) => {
  return httpClient.patch<IUser>(`/users/${userId}/block`, {});
};

export const deleteUser = async (userId: string) => {
  return httpClient.delete<IUser>(`/users/${userId}`);
};
export const unblockUser = async (userId: string) => {
  return httpClient.patch<IUser>(`/users/${userId}/unblock`, {});
};