import styled from "styled-components";
import React from "react";

const ModalOverlay = styled.div<{ $isOpen?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #f5f8fc;
  border-radius: 24px;
  padding: 48px 56px 32px 56px;
  min-width: 480px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #222;
  margin-bottom: 24px;
`;

const ModalSection = styled.div`
  margin-bottom: 32px;
`;

const ModalLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-bottom: 12px;
  display: block;
`;

const ModalInputRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

const ModalInput = styled.select`
  width: 320px;
  padding: 12px 16px;
  border: 1px solid #dbe4ee;
  border-radius: 8px;
  font-size: 15px;
  color: #888;
  background: white;
`;

const FileInput = styled.input`
  width: 320px;
  padding: 12px 16px;
  border: 1px solid #dbe4ee;
  border-radius: 8px;
  font-size: 15px;
  color: #888;
  background: white;
`;

const ModalButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 32px;
`;

const ModalButton = styled.button<{ primary?: boolean }>`
  padding: 12px 48px;
  border-radius: 8px;
  border: 2px solid #0966ff;
  background: ${(props) => (props.primary ? "#0966ff" : "white")};
  color: ${(props) => (props.primary ? "white" : "#0966ff")};
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${(props) => (props.primary ? "#0752cc" : "#f0f4fa")};
  }
`;

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: {
    getDate: string;
    getTime: string;
    limitDate: string;
    limitTime: string;
  }) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = React.useState({
    getDate: "",
    getTime: "",
    limitDate: "",
    limitTime: "",
    image: null as File | null,
  });
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((f) => ({ ...f, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay $isOpen={isOpen}>
      <ModalContainer>
        <ModalSection>
          <ModalTitle>혼획물 포획 일시</ModalTitle>
          <ModalInputRow>
            <ModalLabel htmlFor="getImage">사진 업로드</ModalLabel>
            <FileInput
              type="file"
              id="getImage"
              accept="image/*"
              onChange={handleFileChange}
            />
            {preview && (
              <img
                src={preview}
                alt="미리보기"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            )}
            <ModalLabel htmlFor="getDate">어획 날짜</ModalLabel>
            <ModalInput
              id="getDate"
              value={form.getDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, getDate: e.target.value }))
              }
            >
              <option value="">날짜를 선택해주세요.</option>
              <option value="2025-08-22">2025-08-22</option>
              <option value="2025-08-23">2025-08-23</option>
            </ModalInput>
          </ModalInputRow>
          <ModalInputRow>
            <ModalLabel htmlFor="getTime">어획 시간</ModalLabel>
            <ModalInput
              id="getTime"
              value={form.getTime}
              onChange={(e) =>
                setForm((f) => ({ ...f, getTime: e.target.value }))
              }
            >
              <option value="">시간을 선택해주세요.</option>
              <option value="09:00">09:00</option>
              <option value="14:00">14:00</option>
            </ModalInput>
          </ModalInputRow>
        </ModalSection>
        <ModalSection>
          <ModalTitle>수거 마감 일시</ModalTitle>
          <ModalInputRow>
            <ModalLabel htmlFor="limitDate">마감 날짜</ModalLabel>
            <ModalInput
              id="limitDate"
              value={form.limitDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, limitDate: e.target.value }))
              }
            >
              <option value="">날짜를 선택해주세요.</option>
              <option value="2025-08-22">2025-08-22</option>
              <option value="2025-08-23">2025-08-23</option>
            </ModalInput>
          </ModalInputRow>
          <ModalInputRow>
            <ModalLabel htmlFor="limitTime">마감 시간</ModalLabel>
            <ModalInput
              id="limitTime"
              value={form.limitTime}
              onChange={(e) =>
                setForm((f) => ({ ...f, limitTime: e.target.value }))
              }
            >
              <option value="">시간을 선택해주세요.</option>
              <option value="09:00">09:00</option>
              <option value="14:00">14:00</option>
            </ModalInput>
          </ModalInputRow>
        </ModalSection>
        <ModalButtonRow>
          <ModalButton onClick={onClose}>취소하기</ModalButton>
          <ModalButton primary onClick={() => onSubmit(form)}>
            수정하기
          </ModalButton>
        </ModalButtonRow>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditModal;
