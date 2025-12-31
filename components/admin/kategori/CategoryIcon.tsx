// components/admin/kategori/CategoryIcon.tsx
import React from "react";
import * as Icons from "lucide-react";

interface CategoryIconProps {
  iconName: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  iconName,
  className = "w-5 h-5",
}) => {
  const IconComponent = Icons[
    iconName as keyof typeof Icons
  ] as React.ComponentType<{ className?: string }>;
  
  return IconComponent ? <IconComponent className={className} /> : null;
};