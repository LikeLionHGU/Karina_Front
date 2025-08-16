import styled from "styled-components";

interface MenuCardProps {
  isPrimary?: boolean;
  icon: string;
  title: string;
  onClick: () => void;
}

const Card = styled.div<{ isPrimary?: boolean }>`
  background: ${(props) => (props.isPrimary ? "#4a90e2" : "white")};
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid ${(props) => (props.isPrimary ? "#4a90e2" : "#f0f0f0")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const IconContainer = styled.div<{ isPrimary?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const MenuContent = styled.div`
  flex: 1;
`;

const MenuTitle = styled.h3<{ isPrimary?: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.isPrimary ? "white" : "#333")};
  margin: 0;
`;

function MenuCard({ isPrimary, icon, title, onClick }: MenuCardProps) {
  return (
    <Card isPrimary={isPrimary} onClick={onClick}>
      <IconContainer isPrimary={isPrimary}>{icon}</IconContainer>
      <MenuContent>
        <MenuTitle isPrimary={isPrimary}>{title}</MenuTitle>
      </MenuContent>
    </Card>
  );
}

export default MenuCard;
