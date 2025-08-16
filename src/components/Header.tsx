import styled from "styled-components";
import ProfileDefault from "../assets/profile_default.svg";
import { useNavigate } from "react-router-dom";

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
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
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
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    color: #4a90e2;
  }
`;

function Header() {
  const navigate = useNavigate();

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

          <ProfileSection>
            <ProfileIcon onClick={() => navigate("/profile")}>
              <img src={ProfileDefault} alt="Profile" />
            </ProfileIcon>
            <UserName onClick={() => navigate("/profile")}>
              장세혁
              <ChevronDownIcon />
            </UserName>
          </ProfileSection>
        </NavSection>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
