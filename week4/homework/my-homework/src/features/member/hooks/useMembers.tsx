import { useSuspenseQuery } from "@tanstack/react-query";
import { getMembers } from "@/api/member";

export const useMembers = () => {
  return useSuspenseQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });
};
