import { useNavigate, useParams } from "react-router-dom";
import { useMember } from "@/features/member/hooks/useMember";
import InfoCard from "@/components/InfoCard";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useMember(Number(id));
  const member = data.data;

  return (
    <div className="flex flex-col gap-6 max-w-lg mx-auto">
      <h3 className="text-center text-primary font-extrabold">상세 정보</h3>
      <button
        onClick={() => navigate("/mypage/members")}
        className="flex gap-1 text-gray-500 text-sm hover:text-primary transition-colors w-fit"
      >
        ← 뒤로가기
      </button>
      <InfoCard
        items={[
          { label: "이름", value: member.name },
          { label: "아이디", value: member.loginId },
          { label: "이메일", value: member.email },
          { label: "나이", value: member.age },
          { label: "파트", value: member.part },
        ]}
      />
    </div>
  );
};

export default DetailPage;
