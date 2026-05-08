import Input from "@/components/Input";
import SignupLayout from "./SignupLayout";
import { validateUserId } from "../utils/validate";

interface StepIdProps {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
}

const StepId = ({ userId, setUserId, onNext }: StepIdProps) => {
  const idError = validateUserId(userId);

  return (
    <SignupLayout
      buttonLabel="다음"
      onButtonClick={onNext}
      buttonDisabled={!userId || !!idError}
    >
      <Input
        label="아이디"
        placeholder="아이디를 입력해주세요."
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        errorMessage={idError ?? undefined}
      />
    </SignupLayout>
  );
};

export default StepId;
