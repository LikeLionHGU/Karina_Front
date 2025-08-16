import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MenuCard from "./MenuCard";

interface LeftSidebarProps {
  activeMenu?: "alarm" | "posts" | "profile";
}

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

function LeftSidebar({ activeMenu }: LeftSidebarProps) {
  const navigate = useNavigate();

  return (
    <SidebarContainer>
      <MenuCard
        isPrimary={activeMenu === "alarm"}
        icon=""
        title="매칭 신청 알림"
        onClick={() => navigate("/mypage")}
      />

      <MenuCard
        isPrimary={activeMenu === "posts"}
        icon=""
        title="내가 쓴 글"
        onClick={() => navigate("/mypage/posts")}
      />

      <MenuCard
        isPrimary={activeMenu === "profile"}
        icon=""
        title="회원 정보 수정"
        onClick={() => navigate("/mypage/profile")}
      />
    </SidebarContainer>
  );
}

export default LeftSidebar;
