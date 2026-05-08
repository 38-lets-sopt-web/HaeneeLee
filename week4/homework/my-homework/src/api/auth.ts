import client from "./client";
import type {
  SignInRequest,
  SignInResponse,
  SignupRequest,
  SignupResponse,
} from "./types";

// 회원가입
export const postSignup = async (
  body: SignupRequest,
): Promise<SignupResponse> => {
  const { data } = await client.post("/auth/signup", body);
  return data;
};

// 로그인
export const postLogin = async (
  body: SignInRequest,
): Promise<SignInResponse> => {
  const { data } = await client.post("/auth/signin", body);
  return data;
};
