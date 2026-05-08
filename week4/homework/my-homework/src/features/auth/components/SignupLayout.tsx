import Button from "@/components/Button";
import { Link } from "react-router-dom";

interface SignupLayoutProps {
  children: React.ReactNode;
  buttonLabel: string;
  onButtonClick: () => void;
  buttonDisabled?: boolean;
}

// step 1,2,3에서 회원가입 제목과 다음/회원가입 버튼, 로그인으로 이동하는 링크가 중복된다.
// 따라서 해당 부분을 공통 레이아웃으로 선언하고 내부를 children으로 받아온다.
const SignupLayout = ({
  children,
  buttonLabel,
  onButtonClick,
  buttonDisabled,
}: SignupLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-1/2 flex flex-col gap-5">
        <h3 className="text-center text-primary font-extrabold">회원가입</h3>
        {children}
        <Button
          label={buttonLabel}
          onClick={onButtonClick}
          disabled={buttonDisabled}
        />
        <span className="text-center text-sm text-gray-600">
          이미 계정이 있나요?
          <Link to="/" className="text-blue-400 text-sm text-center">
            로그인
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignupLayout;
