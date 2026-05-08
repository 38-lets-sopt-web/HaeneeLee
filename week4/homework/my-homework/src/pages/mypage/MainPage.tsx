import Button from "@/components/Button";
import InfoCard from "@/components/InfoCard";
import Input from "@/components/Input";
import { useState } from "react";

// MainPage.tsx
const MainPage = () => {
  const [password, setPassword] = useState("");
  const passwordError = "에러 발생";
  return (
    <div>
      전체 페이지
      <InfoCard
        items={[
          { label: "아이디", value: "dlgosl" },
          { label: "파트", value: "web" },
        ]}
      />
      <br />
      <InfoCard
        items={[
          { label: "이름", value: "이해니" },
          { label: "아이디", value: "dlgosl" },
          { label: "이메일", value: "dlgosl@naver.com" },
          { label: "나이", value: 25 },
          { label: "파트", value: "web" },
        ]}
      />
      <div className="w-40">
        <Button label="다음" />
        <Button label="다음" disabled={true} />
      </div>
      <Input
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errorMessage={passwordError ?? undefined}
      />
    </div>
  );
};

export default MainPage;
