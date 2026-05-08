import { useSuspenseQuery } from "@tanstack/react-query";
import { getMember } from "@/api/member";

export const useMyInfo = (userId: number) => {
  return useSuspenseQuery({
    queryKey: ["myInfo", userId],
    queryFn: () => getMember(userId),
  });
};
