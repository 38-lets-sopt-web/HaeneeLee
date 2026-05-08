import type { User } from "@/api/types";

interface MemberCardProps {
  member: User;
  onClick: () => void;
}

const MemberCard = ({ member, onClick }: MemberCardProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-shadow"
    >
      <span className="font-bold text-sm text-primary">{member.name}</span>
      <span className="text-xs text-gray-500">{member.part}</span>
    </div>
  );
};

export default MemberCard;
