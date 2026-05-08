import { postSignup } from "@/api/auth";
import StepId from "@/features/auth/components/StepId";
import StepInfo from "@/features/auth/components/StepInfo";
import StepPassword from "@/features/auth/components/StepPassword";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [step, setStep] = useState(1);

  // 각 단계에서 필요한 state들
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [part, setPart] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await postSignup({
        loginId: userId,
        password,
        name,
        email,
        age: Number(age),
        part,
      });
      alert(`${name}님 회원가입이 완료됐습니다!`);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        const code = error.response?.data?.code;
        alert(message ?? "회원가입에 실패했습니다.");
        // 중복된 아이디일경우 다시 ID를 입력할 수 있도록 이동
        if (code === "AUTH_409_001") {
          setStep(1);
        }
      }
    }
  };

  // 회원가입 3단계 조건부 렌더링
  return (
    <div>
      {step === 1 && (
        <StepId
          userId={userId}
          setUserId={setUserId}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <StepPassword
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <StepInfo
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          age={age}
          setAge={setAge}
          part={part}
          setPart={setPart}
          onSubmit={handleSignup}
        />
      )}
    </div>
  );
};

export default SignupPage;
