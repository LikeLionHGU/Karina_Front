import styled from "styled-components";

interface AcceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  instituteName: string;
  contactInfo: string;
  fishDetails: string;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
`;

const ModalSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
`;

const InfoSection = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  background: #f5f5f5;
  color: #666;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e0e0e0;
  }
`;

const ConfirmButton = styled.button`
  padding: 12px 24px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #357abd;
  }
`;

function AcceptModal({
  isOpen,
  onClose,
  onConfirm,
  instituteName,
  contactInfo,
  fishDetails,
}: AcceptModalProps) {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>

        <ModalTitle>매칭을 수락하시겠습니까?</ModalTitle>
        <ModalSubtitle>아래 정보를 확인하고 매칭을 진행해주세요</ModalSubtitle>

        <InfoSection>
          <InfoItem>
            <InfoLabel>기관명</InfoLabel>
            <InfoValue>{instituteName}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>담당자 정보</InfoLabel>
            <InfoValue>{contactInfo}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>매칭 내용</InfoLabel>
            <InfoValue>{fishDetails}</InfoValue>
          </InfoItem>
        </InfoSection>

        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>매칭 수락</ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default AcceptModal;
