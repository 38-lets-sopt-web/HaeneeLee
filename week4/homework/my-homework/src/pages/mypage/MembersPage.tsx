import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMembers } from "@/features/member/hooks/useMembers";
import { getMember } from "@/api/member";
import InfoCard from "@/components/InfoCard";
import Input from "@/components/Input";
import Button from "@/components/Button";
import MemberCard from "@/features/member/components/MemberCard";
import type { UserDetailResponse } from "@/api/types";
import axios from "axios";

const MembersPage = () => {
  const navigate = useNavigate();
  const { data } = useMembers();
  const members = data.data.users;

  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<
    UserDetailResponse["data"] | null
  >(null);

  const handleSearch = async () => {
    try {
      const result = await getMember(Number(searchId));
      setSearchResult(result.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        alert(message ?? "조회에 실패했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto">
      <h3 className="text-center text-primary font-extrabold">회원 조회</h3>
      <Input
        label="회원 ID"
        type="number"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="회원 ID를 입력해주세요"
      />
      <Button label="검색" onClick={handleSearch} disabled={!searchId} />
      {searchResult ? (
        <InfoCard
          items={[
            { label: "아이디", value: searchResult.loginId },
            { label: "이름", value: searchResult.name },
            { label: "이메일", value: searchResult.email },
            { label: "나이", value: searchResult.age },
            { label: "파트", value: searchResult.part },
          ]}
        />
      ) : (
        <div className="flex items-center justify-center bg-white rounded-lg p-6 text-gray-500 font-bold">
          원하는 ID를 검색해 보세요! 🔎
        </div>
      )}
      <p className="text-md text-primary font-bold">전체 멤버 리스트</p>
      <div className="grid grid-cols-4 gap-4">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onClick={() => navigate(`/mypage/members/${member.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default MembersPage;
