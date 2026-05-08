interface InfoCardProps {
  items: {
    label: string;
    value: string | number;
  }[];
}

// 공통 컴포넌트 (정보 카드)
// 내 정보, 회원 조회 검색 결과, 상세 정보에 사용되는 카드
const InfoCard = ({ items }: InfoCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6">
      {items.map(({ label, value }) => (
        <div key={label} className="flex justify-between">
          <span className="text-primary font-bold">{label}</span>
          <span className="text-gray-400">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
