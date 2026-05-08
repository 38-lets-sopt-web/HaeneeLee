// 아이디 입력값 검증
export const validateUserId = (userId: string) => {
  if (userId.length > 20) return "아이디는 20자 이내로 입력해주세요";
  return null;
};

// 비밀번호 입력값 검증
export const validatePassword = (password: string) => {
  if (password.length < 8 || password.length > 20)
    return "8~20자로 입력해주세요";
  if (!/[a-zA-Z]/.test(password)) return "영문자를 1자 이상 포함해주세요";
  if (!/[0-9]/.test(password)) return "숫자를 1자 이상 포함해주세요";
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))
    return "특수문자를 1자 이상 포함해주세요";
  if (/\s/.test(password)) return "공백은 사용할 수 없어요";
  return null;
};

// 두 비밀번호 일치 여부
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
) => {
  if (password !== confirmPassword) return "비밀번호가 일치하지 않아요";
  return null;
};
