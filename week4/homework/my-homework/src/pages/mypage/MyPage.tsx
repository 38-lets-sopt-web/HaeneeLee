import Button from "@/components/Button";
import InfoCard from "@/components/InfoCard";
import Input from "@/components/Input";
import { patchMember } from "@/api/member";
import { useMyInfo } from "@/features/member/hooks/useMyInfo";
import { validateEmail } from "@/features/auth/utils/validate";
import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const MyPage = () => {
  const userId = Number(localStorage.getItem("userId"));
  const { data } = useMyInfo(userId);
  const userInfo = data.data;

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [age, setAge] = useState(String(userInfo.age));
  const [emailFocused, setEmailFocused] = useState(false);

  const emailError = validateEmail(email);
  const isDisabled = !name || !email || !age || !!emailError;

  const queryClient = useQueryClient();

  const handleUpdate = async () => {
    try {
      await patchMember(userId, {
        name,
        email,
        age: Number(age),
      });
      await queryClient.invalidateQueries({ queryKey: ["myInfo", userId] }); // 이름 변경이 바로 반영될 수 있도록
      alert("정보가 수정됐습니다.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        alert(message ?? "정보 수정에 실패했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto">
      <h3 className="text-center text-primary font-extrabold">내 정보 </h3>
      <InfoCard
        items={[
          { label: "아이디", value: userInfo.loginId },
          { label: "파트", value: userInfo.part },
        ]}
      />
      <Input
        label="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력해주세요"
      />
      <Input
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailFocused(true);
        }}
        placeholder="이메일을 입력해주세요"
        errorMessage={emailFocused ? (emailError ?? undefined) : undefined}
      />
      <Input
        label="나이"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="나이를 입력해주세요"
      />
      <Button label="정보 수정" onClick={handleUpdate} disabled={isDisabled} />
    </div>
  );
};

export default MyPage;
