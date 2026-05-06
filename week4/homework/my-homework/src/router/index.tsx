import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// 라우터 최적화 lazy loading
//
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
