import { type LucideProps, Moon, Plus, Sun, Trash } from "lucide-react";
import React from "react";

const IconsList = {
  Sun,
  Moon,
  Trash,
  Plus,
};

export type IconName = keyof typeof IconsList;

interface IconProps extends LucideProps {
  name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const LucideIcon = IconsList[name];

  return <LucideIcon {...props} />;
};
