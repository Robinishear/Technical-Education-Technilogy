"use server";

import { ProfileService } from "./profile.service";
import { IUserProfile } from "./profile.types";


export const getMyProfileAction = async () => {
    const user = await ProfileService.getProfile();
    
    if (user) {
        return { success: true, data: user };
    }
    return { success: false, message: "User data not found!" };
};
export const updateMyProfileAction = async (data: Partial<IUserProfile>) => {
    const result = await ProfileService.updateProfile(data);
    if (result) {
        return { success: true, data: result };
    }
    return { success: false, message: "Update failed!" };
};