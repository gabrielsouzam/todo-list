import { iconMap } from "@/utils/icon-map";
import React from "react";

interface DynamicIconProps {
  icon: string;
  color?: string;
  size?: number;
};

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  icon,
  color = "black",
  size = 24,
}) => {
  const IconComponent = iconMap[icon]; 
  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in iconMap.`);
    return null; 
  }

  return <IconComponent size={size} color={color} weight="fill" />;
};
