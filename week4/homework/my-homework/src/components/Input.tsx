import { useState } from "react";
import { cn } from "@/utils/cn";

interface InputProps {
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  label?: string;
}

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  errorMessage,
  label,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기 토글

  // type이 password이고, showPassword가 true일 때 'text'
  // type이 password이고, showPassword가 false일 때 그대로 type => 즉, password
  // type이 password가 아니라면, 기존의 type 유지
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <span className="text-md text-gray-700 font-bold">{label}</span>
      )}
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            "w-full px-4 py-3 rounded-lg border outline-none transition-colors",
            "border-gray-300 focus:border-blue-400",
            errorMessage && "border-red-300 focus:border-red-600",
          )}
        />
        {/* type이 비밀번호일 때 토글 렌더링 */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {/* error가 발생했을 때 */}
      {errorMessage && (
        <span className="pt-2 text-sm text-red-400">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
