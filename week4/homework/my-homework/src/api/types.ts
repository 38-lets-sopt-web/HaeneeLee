// 공통 베이스
interface BaseResponse {
  success: boolean;
  status: number;
  message: string;
  code: string;
}

// 회원가입
export interface SignupRequest {
  loginId: string;
  password: string;
  name: string;
  email: string;
  age: number;
  part: string;
}

export type SignupResponse = BaseResponse;

// 로그인
export interface SignInRequest {
  loginId: string;
  password: string;
}

export interface SignInResponse extends BaseResponse {
  data: {
    userId: number;
  };
}

// 유저 목록 조회
export interface UsersResponse extends BaseResponse {
  data: {
    users: User[];
  };
}

export interface User {
  id: number;
  name: string;
  part: string;
}

// 특정 유저 조회 및 수정
export interface UserDetailRequest {
  name: string;
  email: string;
  age: number;
}

export interface UserDetailResponse extends BaseResponse {
  data: {
    id: number;
    loginId: string;
    name: string;
    email: string;
    age: number;
    part: string;
  };
}
