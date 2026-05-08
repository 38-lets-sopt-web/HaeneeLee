import { useMyInfo } from "@/features/member/hooks/useMyInfo";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));
  const { data } = useMyInfo(userId);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between px-8 py-4 bg-primary shadow-sm">
        <div className="flex flex-col gap-1">
          <h3 className="text-center text-white font-extrabold">
            SOPT MEMBERS
          </h3>
          <span className="text-white text-sm">
            안녕하세요. {data.data.name}님!
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <NavLink
            to="/mypage"
            end // members도 /mypage의 하위경로라서 active로 인식됨. 따라서 end props가 있어야함
            className={({ isActive }) =>
              isActive
                ? "text-white font-bold text-sm"
                : "text-gray-700 text-sm hover:text-gray-300 transition-colors"
            }
          >
            내 정보
          </NavLink>
          <NavLink
            to="/mypage/members"
            className={({ isActive }) =>
              isActive
                ? "text-white font-bold text-sm"
                : "text-gray-500 text-sm hover:text-gray-300 transition-colors"
            }
          >
            회원 조회
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
          >
            로그아웃
          </button>
        </nav>
      </header>
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainPage;
