import { getUserInfo } from "@/core/axios/auth.services";
import { IUserProfile } from "./profile.types";
import { httpClient } from "@/core/axios/httpClient";

export const ProfileService = {
    getProfile: async (): Promise<IUserProfile | null> => {
        try {
            const data = await getUserInfo();
            return data; 
        } catch (error) {
            console.error("Profile fetch error:", error);
            return null;
        }
    },

    updateProfile: async (data: Partial<IUserProfile>) => {
        return httpClient.patch<IUserProfile>("/users/update-profile", data);
    }
};