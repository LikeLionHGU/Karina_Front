import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import MenuCard from "./MenuCard";
import PuzzleActiveIcon from "../assets/icons/Puzzle_active.svg"; // Assuming you have an icon for the puzzle
import PuzzleInactiveIcon from "../assets/icons/Puzzle_inactive.svg"; // Assuming you have an icon for the puzzle when inactive
import EditActiveIcon from "../assets/icons/Edit_active.svg"; // Assuming you have an icon for editing
import EditInactiveIcon from "../assets/icons/Edit_inactive.svg"; // Assuming you have an icon for editing
import GraphActiveIcon from "../assets/icons/Graph_active.svg"; // Assuming you have an icon for the graph
import GraphInactiveIcon from "../assets/icons/Graph_inactive.svg"; // Assuming you have an icon for the graph when inactive

interface LeftSidebarProps {
  activeMenu?: "request" | "posts" | "matching" | "profile";
}

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  background-color: #f4f8fe;
  padding: 20px;
  border-radius: 16px;
  gap: 0; /* remove spacing between MenuCards; padding provides space from edges */
  box-sizing: border-box;
`;

function LeftSidebar({ activeMenu }: LeftSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const handleRequestClick = () => {
    if (location.pathname !== "/mypage/request") {
      navigate("/mypage/request");
    }
  };

  if (role === "fisher") {
    return (
      <SidebarContainer>
        <MenuCard
          isPrimary={activeMenu === "request"}
          icon={<img src={PuzzleActiveIcon} alt="Puzzle Icon" />}
          inactiveIcon={
            <img src={PuzzleInactiveIcon} alt="Puzzle Inactive Icon" />
          }
          title="매칭 신청 알림"
          onClick={handleRequestClick}
        />

        <MenuCard
          isPrimary={activeMenu === "posts"}
          icon={<img src={GraphActiveIcon} alt="Graph Icon" />}
          inactiveIcon={
            <img src={GraphInactiveIcon} alt="Graph Inactive Icon" />
          }
          title="내가 쓴 글"
          onClick={() => navigate("/mypage/posts")}
        />

        <MenuCard
          isPrimary={activeMenu === "profile"}
          icon={<img src={EditActiveIcon} alt="Edit Icon" />}
          inactiveIcon={<img src={EditInactiveIcon} alt="Edit Inactive Icon" />}
          title="회원 정보 수정"
          onClick={() => {
            if (location.pathname !== "/mypage/profile") {
              navigate("/mypage/profile");
            }
          }}
        />
      </SidebarContainer>
    );
  } else if (role === "factory") {
    return (
      <SidebarContainer>
        <MenuCard
          isPrimary={activeMenu === "matching"}
          icon={<img src={PuzzleActiveIcon} alt="Puzzle Icon" />}
          inactiveIcon={
            <img src={PuzzleInactiveIcon} alt="Puzzle Inactive Icon" />
          }
          title="매칭 신청 현황"
          onClick={() => navigate("/mypage/matching")}
        />

        <MenuCard
          isPrimary={activeMenu === "profile"}
          icon={<img src={EditActiveIcon} alt="Edit Icon" />}
          inactiveIcon={<img src={EditInactiveIcon} alt="Edit Inactive Icon" />}
          title="회원 정보 수정"
          onClick={() => {
            if (location.pathname !== "/mypage/profile") {
              navigate("/mypage/profile");
            }
          }}
        />
      </SidebarContainer>
    );
  } else {
    // 로그인 전 등 기타 상황 fallback
    return (
      <SidebarContainer>
        <MenuCard
          isPrimary={false}
          icon={""}
          title="로그인 이동"
          onClick={() => navigate("/login")}
        />
      </SidebarContainer>
    );
  }
}

export default LeftSidebar;
