"use server";
import { getApprovedUsers } from "./approved-users.service";

export const getApprovedUsersAction = async () => {
  return getApprovedUsers();
};