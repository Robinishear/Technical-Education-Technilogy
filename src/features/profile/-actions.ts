"use server";

import { ProfileService } from "./profile.service";


export const getMyProfileAction = async () => {
    const user = await ProfileService.getProfile();
    
    if (user) {
        return { success: true, data: user };
    }
    return { success: false, message: "User data not found!" };
};