/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

export const getIconComponent = (iconName: string): LucideIcon => {
    const IconComponent = (Icons as any)[iconName];

    if (!IconComponent) {
        return Icons.HelpCircle;
    }

    return IconComponent as LucideIcon;
};