import styled, { keyframes } from "styled-components";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface MenuCardProps {
  isPrimary?: boolean;
  icon?: ReactNode;
  inactiveIcon?: ReactNode;
  title: string;
  onClick: () => void;
  /** optional trigger from parent (e.g. activeMenu change) to play animation */
  animateKey?: string | number | null;
}

// subtle lift+scale animation
const clickAnim = keyframes`
  0% { transform: translateY(0) scale(1); }
  40% { transform: translateY(-6px) scale(1.03); }
  100% { transform: translateY(0) scale(1); }
`;

const Card = styled.div<{ isPrimary?: boolean; animating?: boolean }>`
  background: ${(props) => (props.isPrimary ? "#0966FF" : "transparent")};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.18s ease;
  border-radius: ${(props) => (props.isPrimary ? "14px" : "8px")};
  ${(p) => (p.animating ? `animation: ${clickAnim} 360ms ease;` : "")}
`;

const IconContainer = styled.div<{ isPrimary?: boolean }>`
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

const MenuTitle = styled.h3<{ isPrimary?: boolean }>`
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
  animateKey,
}: MenuCardProps) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (animateKey != null) {
      setAnimating(true);
      const t = setTimeout(() => setAnimating(false), 400);
      return () => clearTimeout(t);
    }
    return;
  }, [animateKey]);

  const handleClick = () => {
    setAnimating(true);
    onClick();
  };
  const displayedIcon = isPrimary ? icon : inactiveIcon ?? icon;

  return (
    <Card
      isPrimary={isPrimary}
      animating={animating}
      onClick={handleClick}
      onAnimationEnd={() => setAnimating(false)}
    >
      <IconContainer isPrimary={isPrimary}>{displayedIcon}</IconContainer>
      <MenuContent>
        <MenuTitle isPrimary={isPrimary}>{title}</MenuTitle>
      </MenuContent>
    </Card>
  );
}

export default MenuCard;
