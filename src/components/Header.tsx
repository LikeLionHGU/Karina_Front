import styled from "styled-components";
import ProfileDefault from "../assets/profile_default.svg";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

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
  background-color: white;
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

const Logo = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;

  img {
    width: 70%;
    height: 70%;
    object-fit: contain;
  }
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
`;

const PostButton = styled.button`
  color: var(--Black-4, #454545);
  background: none;
  border: none;
  cursor: pointer;

  /* Button 2 */
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative; /* anchor for dropdown */
`;

const LoginButton = styled.button`
  padding: 8px 32px;
  color: #fff;
  background: #0966ff;
  border: none;
  border-radius: 16px;
  cursor: pointer;

  /* Button 2 */
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const ProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-color: var(--Black-1, #e6e6e6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  img {
    width: 70%;
    height: 70%;
    object-fit: contain;
    max-width: 42px;
    max-height: 42px;
  }
`;

const UserName = styled.span`
  color: var(--Black-4, #454545);
  cursor: pointer;

  /* Button 2 */
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    color: #4a90e2;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 120%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(9, 102, 255, 0.12);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  z-index: 200;
`;

const DropdownButton = styled.button<{ primary?: boolean }>`
  width: 100%;
  padding: 5px 12px;
  background: #FFF;
  color: #333;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;

  &:hover {
    background: #0966FF;
    color: white;
  }
`;

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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

  const handleLogout = () => {
    // 실제 로그아웃 로직을 여기에 연결하세요 (토큰 삭제 등)
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo onClick={() => navigate("/home")}>
          <img src="/logo.svg" alt="Logo" />
        </Logo>

        <NavSection>
          <PostButton onClick={() => navigate("/post")}>
            혼획물 등록하기
          </PostButton>

          <ProfileSection ref={ref}>
            <LoginButton onClick={() => navigate("/login")}>
              (임시) 로그인 / 회원가입
            </LoginButton>
            <ProfileIcon onClick={() => setOpen((s) => !s)}>
              <img src={ProfileDefault} alt="Profile" />
            </ProfileIcon>
            <UserName onClick={() => setOpen((s) => !s)}>
              장세혁
              <ChevronDownIcon />
            </UserName>

            {open && (
              <Dropdown>
                <DropdownButton primary onClick={() => navigate("/mypage")}>
                  마이페이지
                </DropdownButton>
                <DropdownButton
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  로그아웃
                </DropdownButton>
              </Dropdown>
            )}
          </ProfileSection>
        </NavSection>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
