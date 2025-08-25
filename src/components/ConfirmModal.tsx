import React from "react";
import styled from "styled-components";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  body: string;
  isSuccess?: boolean;         
  confirmText?: string;
  cancelText?: string;
  singleText?: string;
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
  border-radius: 20px;
  padding: 50px 40px 40px;
  width: 90%;
  max-width: 550px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: var(--Black-4, #454545);
  margin: 0 0 50px 0;
  line-height: 1.4;
`;

const ModalBody = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: var(--Black-4, #666);
  margin: -20px 0 40px 0;
  line-height: 1.4;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;
`;

const CancelButton = styled.button`
  padding: 16px 32px;
  background: #fff;
  color: #666;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  min-width: 170px;

  &:hover {
    background: #f5f5f5;
  }
`;

const ConfirmButton = styled.button`
  padding: 16px 32px;
  background: #0966ff;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  min-width: 170px;

  &:hover {
    background: #0752cc;
  }
`;

const SuccessButton = styled.button`
  padding: 16px 32px;
  background: #0966ff;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  min-width: 170px;

  &:hover {
    background: #0752cc;
  }
`;

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  body,
  isSuccess = false,
  confirmText,   
  cancelText,    
  singleText,    
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  /*onConrrm => analysisArticle에서 사용*/

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalBody>{body}</ModalBody>
        <ButtonContainer>
           {isSuccess ? (
              <SuccessButton onClick={onClose}>
                {singleText ?? "확인"}       
              </SuccessButton>
            ) : (
            <>
              <CancelButton onClick={onClose}>{cancelText ?? "취소하기"}</CancelButton>
              <ConfirmButton onClick={onConfirm}>{confirmText ?? "신청하기"}</ConfirmButton>
            </>
          )}
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ConfirmModal;
