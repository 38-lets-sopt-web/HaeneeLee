// utils/validate.ts
export const validateUserId = (userId: string) => {
  if (userId.length > 20) return "아이디는 20자 이내로 입력해주세요";
  return null;
};
