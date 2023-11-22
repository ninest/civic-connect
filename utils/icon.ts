import { Edit, Edit2, File, FormInput, BarChart2 ,MessagesSquare} from "lucide-react";

export const iconClasses = "h-4 w-4";
export const iconClassesR = `ml-2 ${iconClasses}`;
export const iconClassesL = `mr-2 ${iconClasses}`;

export const iconMap = {
  Edit,
  Edit2,
  File,
  FormInput,
  BarChart2,
  MessagesSquare
};
export type IconSlug = keyof typeof iconMap;
