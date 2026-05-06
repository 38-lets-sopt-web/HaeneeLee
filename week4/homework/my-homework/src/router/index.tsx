import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// 라우터 최적화 lazy loading
// 각 페이지를 별도 JS 청크로 분리해 초기 로딩 시 다운로드하지 않고, 해당 라우트 접근 시에만 다운로드
// app.tsx의 suspense가 lazy로 불러오는 동안 로딩 중을 명시함
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const MainPage = lazy(() => import("@/pages/mypage/MainPage"));
const MyPage = lazy(() => import("@/pages/mypage/MyPage"));
const MembersPage = lazy(() => import("@/pages/mypage/MembersPage"));
const DetailPage = lazy(() => import("@/pages/mypage/DetailPage"));

export const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  {
    path: "/mypage",
    element: <MainPage />,
    children: [
      { index: true, element: <MyPage /> },
      { path: "members", element: <MembersPage /> },
      { path: "members/:id", element: <DetailPage /> },
    ],
  },
]);
