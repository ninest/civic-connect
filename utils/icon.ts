import { Edit, Edit2, File, FormInput, BarChart2 } from "lucide-react";

export const iconClasses = "h-4 w-4";
export const iconClassesR = `ml-2 ${iconClasses}`;
export const iconClassesL = `mr-2 ${iconClasses}`;

export const iconMap = {
  Edit,
  Edit2,
  File,
  FormInput,
  BarChart2,
};
export type IconSlug = keyof typeof iconMap;
