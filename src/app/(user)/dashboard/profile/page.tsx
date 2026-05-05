export const dynamic = "force-dynamic";

import { getMyProfileAction } from "@/features/usersDashboard/profile/-actions";
import { ProfileContent } from "@/features/usersDashboard/profile/Components/profile.profile";


export default async function Page() {
    const result = await getMyProfileAction();

    // if (!result.success) {
    //     redirect("/login"); 
    // }

    return (
        <div className="py-20 min-h-screen bg-linear-to-b from-background to-secondary/20">
            <ProfileContent user={result.data} />
        </div>
    );
}