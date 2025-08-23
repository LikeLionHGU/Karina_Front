import styled from "styled-components";
import type { ReactNode } from "react";

interface MenuCardProps {
  isPrimary?: boolean;
  icon?: ReactNode;
  inactiveIcon?: ReactNode;
  title: string;
  onClick: () => void;
  className?: string; // Optional className prop for additional styling
}

// styled-components v5 이상에서 shouldForwardProp 사용
const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isPrimary",
})<{ isPrimary?: boolean }>`
  background: ${(props) => (props.isPrimary ? "#0966FF" : "transparent")};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  border-radius: ${(props) => (props.isPrimary ? "14px" : "8px")};
`;

const IconContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isPrimary",
})<{ isPrimary?: boolean }>`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  overflow: hidden;
  color: ${(props) => (props.isPrimary ? "#0966FF" : "#999")};

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    opacity: ${(props) => (props.isPrimary ? 1 : 0.9)};
  }
`;

const MenuContent = styled.div`
  flex: 1;
`;

const MenuTitle = styled.h3.withConfig({
  shouldForwardProp: (prop) => prop !== "isPrimary",
})<{ isPrimary?: boolean }>`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${(props) => (props.isPrimary ? "#F8FBFE" : "#8aa0c7")};
  margin: 0;
`;

function MenuCard({
  isPrimary,
  icon,
  inactiveIcon,
  title,
  onClick,
}: MenuCardProps) {
  const handleClick = () => {
    onClick();
  };
  const displayedIcon = isPrimary ? icon : inactiveIcon ?? icon;

  return (
    <Card isPrimary={isPrimary} onClick={handleClick}>
      <IconContainer isPrimary={isPrimary}>{displayedIcon}</IconContainer>
      <MenuContent>
        <MenuTitle isPrimary={isPrimary}>{title}</MenuTitle>
      </MenuContent>
    </Card>
  );
}

export default MenuCard;
