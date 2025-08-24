import styled from "styled-components";
import DefaultImage from "../assets/profile/default.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import LogoutModal from "./LogoutModal";

interface HeaderProps {
  isLanding?: boolean;
}

const ChevronDownIcon = () => (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginLeft: "4px" }}
  >
    <path
      d="M1 1.5L6 6.5L11 1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HeaderContainer = styled.header`
  width: 100vw;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.div<{ $disabled?: boolean }>`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: ${(props) => (props.$disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  & img {
    width: 70%;
    height: 70%;
    object-fit: contain;
    pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};
  }
`;
const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
`;
const PostButton = styled.button`
  color: #454545;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`;
const LoginButton = styled.button`
  padding: 8px 32px;
  color: #fff;
  background: #0966ff;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const ProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background: #e6e6e6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  background-image: url(${DefaultImage});
  background-size: cover;
  background-position: center;
`;
const UserName = styled.span`
  color: #454545;
  cursor: pointer;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  &:hover {
    color: #0966ff;
  }
`;
const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 120%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(9, 102, 255, 0.12);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  z-index: 200;
`;
const DropdownButton = styled.button<{ primary?: boolean }>`
  width: 110%;
  padding: 5px 12px;
  background: #fff;
  color: #333;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  &:hover {
    color: #0966ff;
  }
`;

function Header({ isLanding = false }: HeaderProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleLogoClick = () => {
    if (isLanding) return;
    const role = localStorage.getItem("role");
    if (role === "ROLE_FACTORY") {
      navigate("/home/factory");
    } else if (role === "ROLE_FISHER") {
      navigate("/home/fisher");
    } else {
      navigate("/");
    }
  };

  const handleMyPageClick = () => {
    const role = localStorage.getItem("role");
    if (role === "ROLE_FISHER") {
      navigate("/mypage/request");
    } else if (role === "ROLE_FACTORY") {
      navigate("/mypage/matching");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
    setIsLogoutSuccess(false);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    setIsLogoutSuccess(true);
  };

  const handleLogoutClose = () => {
    if (isLogoutSuccess) {
      setIsLogoutModalOpen(false);
      setIsLogoutSuccess(false);
      navigate("/");
    } else {
      setIsLogoutModalOpen(false);
      setIsLogoutSuccess(false);
    }
  };

  const role = localStorage.getItem("role");
  const currentPath = window.location.pathname;
  const hidePostButtonForFisher =
    role === "ROLE_FISHER" &&
    ["/article/analysis", "/article/end", "/videoanalysis"].some((p) =>
      currentPath.startsWith(p)
    );

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo onClick={handleLogoClick} $disabled={isLanding}>
          <img src="/logo.svg" alt="Logo" />
        </Logo>
        <NavSection>
          {/* '혼획물 등록하기' 버튼: ROLE_FISHER이고 특정 페이지가 아니면 노출 */}
          {role === "ROLE_FISHER" && !isLanding && !hidePostButtonForFisher && (
            <PostButton onClick={() => navigate("/post")}>
              혼획물 등록하기
            </PostButton>
          )}
          <ProfileSection ref={ref}>
            <ProfileIcon />
            {localStorage.getItem("userName") ? (
              <UserName onClick={() => setOpen((prev) => !prev)}>
                {localStorage.getItem("userName")}
                <ChevronDownIcon />
              </UserName>
            ) : (
              <LoginButton onClick={() => navigate("/login")}>
                로그인 / 회원가입
              </LoginButton>
            )}
            {open && (
              <Dropdown>
                <DropdownButton primary onClick={handleMyPageClick}>
                  마이페이지
                </DropdownButton>
                <DropdownButton onClick={handleLogout}>로그아웃</DropdownButton>
              </Dropdown>
            )}
            <LogoutModal
              isOpen={isLogoutModalOpen}
              onClose={handleLogoutClose}
              onConfirm={handleLogoutConfirm}
              title="로그아웃하시겠습니까?"
              body="로그아웃 시 홈으로 이동합니다."
              isSuccess={isLogoutSuccess}
            />
          </ProfileSection>
        </NavSection>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
