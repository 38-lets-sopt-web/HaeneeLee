import { postLogin } from "@/api/auth";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 라우팅
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await postLogin({ loginId: userId, password }); // 로그인 api 함수 호출
      localStorage.setItem("userId", String(response.data.userId)); // userId 로컬 스토리지 저장
      navigate("/mypage"); // mypage로 라우팅
    } catch {
      setErrorMessage("아이디 또는 비밀번호가 올바르지 않습니다."); // 로그인 실패 처리
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-1/2 flex flex-col gap-5">
        <h1 className="text-center text-primary font-extrabold">
          SOPT MEMBERS
        </h1>
        <Input
          label="아이디"
          placeholder="아이디를 입력해주세요."
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && (
          <span className="text-red-400 text-sm">{errorMessage}</span>
        )}
        <Button
          label="로그인"
          onClick={handleLogin}
          type="button"
          disabled={!userId || !password} // 빈 문자열은 falsy라 !loginId면 비활성화
        />
        <Link to="/signup" className="text-blue-400 text-sm text-center">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
