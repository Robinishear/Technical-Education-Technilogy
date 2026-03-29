import { getUserInfo } from "@/core/axios/auth.services";
import { IUserProfile } from "./profile.types";


export const ProfileService = {
    getProfile: async (): Promise<IUserProfile | null> => {
        try {
            const data = await getUserInfo();
            return data; 
        } catch (error) {
            console.error("Profile fetch error:", error);
            return null;
        }
    }
};