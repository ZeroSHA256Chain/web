import { format } from "date-fns";

export const formatDate = (timestamp: number) => {
  return format(timestamp, "d MMM yyyy 'at' HH:mm");
};
