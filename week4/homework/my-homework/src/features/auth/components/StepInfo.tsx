import Input from "@/components/Input";
import SignupLayout from "./SignupLayout";
import { validateEmail, validateAge, validateName } from "../utils/validate";
import { useState } from "react";

interface StepInfoProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  age: string;
  setAge: React.Dispatch<React.SetStateAction<string>>;
  part: string;
  setPart: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}

const PART_OPTIONS = ["iOS", "안드로이드", "웹"];

const StepInfo = ({
  name,
  setName,
  email,
  setEmail,
  age,
  setAge,
  part,
  setPart,
  onSubmit,
}: StepInfoProps) => {
  const [emailFocused, setEmailFocused] = useState(false);

  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const ageError = validateAge(age);

  const isDisabled =
    !name ||
    !email ||
    !age ||
    !part ||
    !!nameError ||
    !!emailError ||
    !!ageError;

  return (
    <SignupLayout
      buttonLabel="회원가입"
      onButtonClick={onSubmit}
      buttonDisabled={isDisabled}
    >
      <Input
        label="이름"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
        errorMessage={nameError ?? undefined}
      />
      <Input
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailFocused(true);
        }}
        errorMessage={(emailFocused && emailError) || undefined}
      />
      <Input
        label="나이"
        type="number"
        placeholder="나이를 입력해주세요"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        errorMessage={ageError ?? undefined}
      />
      <div className="flex flex-col gap-1">
        <span className="mb-2 text-sm text-gray-700 font-bold">파트</span>
        <select
          value={part}
          onChange={(e) => setPart(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-blue-400"
        >
          <option
            value=""
            className="placeholder:text-gray-400 placeholder:text-sm"
          >
            파트를 선택해주세요
          </option>
          {PART_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </SignupLayout>
  );
};

export default StepInfo;
