import Button from "@/components/Button";
import InfoCard from "@/components/InfoCard";

// MainPage.tsx
const MainPage = () => {
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
    </div>
  );
};

export default MainPage;
