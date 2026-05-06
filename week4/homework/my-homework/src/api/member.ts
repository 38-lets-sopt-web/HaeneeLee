import client from "./client";
import type {
  UserDetailRequest,
  UserDetailResponse,
  UsersResponse,
} from "./types";

// 유저 목록 조회
export const getMembers = async (): Promise<UsersResponse> => {
  const { data } = await client.get("/users");
  return data;
};

// 개인정보 조회
export const getMember = async (
  memberId: number,
): Promise<UserDetailResponse> => {
  const { data } = await client.get(`/users/${memberId}`);
  return data;
};

// 개인정보 수정
export const patchMember = async (
  userId: number,
  body: UserDetailRequest,
): Promise<UserDetailResponse> => {
  const { data } = await client.patch(`/users/${userId}`, body);
  return data;
};
