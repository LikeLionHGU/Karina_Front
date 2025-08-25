import styled from "styled-components";
import LocationImg from "../assets/icons/LocationIcon.svg";

interface FishModalProps {
  isOpen: boolean;
  onClose: () => void;
  fishData: {
    articleId?: string;
    mainAddress: string;
    fishInfo: Record<string, number>;
    fisherName: string;
    postDate: string;
    status: number;
    thumbnail?: string;
  };
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #666;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

const FishImage = styled.div<{ thumbnail?: string }>`
  width: 100%;
  padding: 40px 50px 0px 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    width: 100%;
    height: 300px;
    background-image: url(${(props) => props.thumbnail || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23e3f2fd'/%3E%3Ctext x='200' y='125' font-family='Arial' font-size='60' text-anchor='middle' fill='%230966ff'%3E🐟%3C/text%3E%3C/svg%3E"});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 12px 12px 0px 0px;
    display: block;
  }
`;

const ModalInfoSection = styled.div`
  padding: 20px 40px;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const LocationIcon = styled.span`
  display: flex;
  align-items: center;
`;

const LocationText = styled.span`
  color: #666;
  font-size: 14px;
`;

const FishTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0 0 24px 0;
  padding-left: 20px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px 16px;
  margin-bottom: 24px;
  padding-left: 20px;
`;

const InfoLabel = styled.div`
  color: #0966ff;
  font-size: 14px;
  font-weight: 600;
`;

const InfoValue = styled.div`
  color: #333;
  font-size: 14px;
`;

function FishModal({ isOpen, onClose, fishData }: FishModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const fishInfoList = fishData.fishInfo
    ? Object.entries(fishData.fishInfo).map(
        ([name, count]) => `${name} ${count}마리`
      )
    : [];

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>

        <FishImage thumbnail={fishData.thumbnail} />

        <ModalInfoSection>
          <LocationContainer>
            <LocationIcon>
              <img
                src={LocationImg}
                alt="위치"
                style={{ width: 18, height: 18 }}
              />
            </LocationIcon>
            <LocationText>{fishData.mainAddress}</LocationText>
          </LocationContainer>

          <FishTitle>
            {fishInfoList.length > 0 ? fishInfoList.join(", ") : ""}
          </FishTitle>

          <InfoGrid>
            <InfoLabel>어부</InfoLabel>
            <InfoValue>{fishData.fisherName}</InfoValue>

            <InfoLabel>등록일</InfoLabel>
            <InfoValue>{fishData.postDate}</InfoValue>
          </InfoGrid>
        </ModalInfoSection>
      </ModalContent>
    </ModalOverlay>
  );
}

export default FishModal;
