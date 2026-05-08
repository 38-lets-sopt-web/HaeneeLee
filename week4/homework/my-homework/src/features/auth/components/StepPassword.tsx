import Input from "@/components/Input";
import SignupLayout from "./SignupLayout";
import { validateConfirmPassword, validatePassword } from "../utils/validate";

interface StepIdProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
}

const StepPassword = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onNext,
}: StepIdProps) => {
  const passwordError = validatePassword(password);
  const confirmError = validateConfirmPassword(password, confirmPassword);

  // 버튼 비활성화 조건
  const isDisabled =
    !password || !confirmPassword || !!passwordError || !!confirmError;

  return (
    <SignupLayout
      buttonLabel="다음"
      onButtonClick={onNext}
      buttonDisabled={isDisabled}
    >
      <Input
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errorMessage={passwordError ?? undefined}
      />
      <Input
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 입력해주세요."
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        errorMessage={confirmError ?? undefined}
      />
    </SignupLayout>
  );
};

export default StepPassword;
