"use server";

import { getAllUsers, approveUser, blockUser, deleteUser, unblockUser } from "./users.service";


export const getUsersAction = async (search?: string) => {
  return getAllUsers(search);
};

export const approveUserAction = async (userId: string) => {
  return approveUser(userId);
};

export const blockUserAction = async (userId: string) => {
  return blockUser(userId);
};

export const deleteUserAction = async (userId: string) => {
  return deleteUser(userId);
};
export const unblockUserAction = async (userId: string) => {
  return unblockUser(userId);
};