import {
  CalendarClock,
  ChevronDown,
  ExternalLink,
  type LucideProps,
  Menu,
  Moon,
  Plus,
  RefreshCw,
  Star,
  Sun,
  Trash,
  X,
} from "lucide-react";
import React from "react";

const IconsList = {
  Sun,
  Moon,
  Trash,
  Plus,
  X,
  ChevronDown,
  ExternalLink,
  RefreshCw,
  Menu,
  CalendarClock,
  Star,
};

export type IconName = keyof typeof IconsList;

interface IconProps extends LucideProps {
  name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const LucideIcon = IconsList[name];

  return <LucideIcon {...props} />;
};
