import { useSuspenseQuery } from "@tanstack/react-query";
import { getMember } from "@/api/member";

export const useMember = (id: number) => {
  return useSuspenseQuery({
    queryKey: ["member", id],
    queryFn: () => getMember(id),
  });
};
