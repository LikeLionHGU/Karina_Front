import styled from "styled-components";
import { useState, useEffect } from "react";

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
  display: flex;
  flex-direction: column;
`;

const ModalLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #222;
`;

const ModalInputRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 12px;
  align-items: center;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const FileTextBox = styled.div`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #b5c6de;
  border-radius: 8px;
  font-size: 15px;
  color: #8ca0b3;
  background: #fff;
  box-sizing: border-box;
  outline: none;
`;

const FileUploadButton = styled.button`
  padding: 10px 24px;
  border-radius: 8px;
  border: 1.5px solid #0966ff;
  background: #fff;
  color: #0966ff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #eaf3ff;
    color: #0752cc;
  }
`;

const ModalButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 32px;
`;

const ModalButton = styled.button<{ $primary?: boolean }>`
  padding: 12px 48px;
  border-radius: 8px;
  border: 2px solid #0966ff;
  background: ${(props) => (props.$primary ? "#0966ff" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#0966ff")};
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${(props) => (props.$primary ? "#0752cc" : "#f0f4fa")};
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
    image?: File | null;
  }) => void;
  articleId?: any;
  initialData?: {
    getDate?: string;
    getTime?: string;
    limitDate?: string;
    limitTime?: string;
    image?: string;
    fishInfo?: Array<string>;
  };
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  articleId,
  initialData,
}) => {
  const [form, setForm] = useState<{
    getDate: string;
    getTime: string;
    limitDate: string;
    limitTime: string;
    image: File | null;
  }>({
    getDate: "",
    getTime: "",
    limitDate: "",
    limitTime: "",
    image: null,
  });
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && initialData && Object.keys(initialData).length > 0) {
      setForm({
        getDate: initialData.getDate || "",
        getTime: initialData.getTime || "",
        limitDate: initialData.limitDate || "",
        limitTime: initialData.limitTime || "",
        image: null,
      });
      if (initialData.image) {
        setPreview(initialData.image);
      } else {
        setPreview(null);
      }
    }
  }, [initialData, isOpen]);



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
          <ModalTitle>사진 업로드</ModalTitle>
          <ModalInputRow>
            <FileInputLabel htmlFor="getImage">
              <FileTextBox>
                {preview
                  ? "사진이 업로드되었습니다."
                  : "글 등록에 필요한 사진을 업로드하세요."}
              </FileTextBox>
              <FileUploadButton
                type="button"
                onClick={() => {
                  const input = document.getElementById(
                    "getImage"
                  ) as HTMLInputElement;
                  if (input) input.click();
                }}
              >
                파일 업로드
              </FileUploadButton>
              <FileInput
                type="file"
                id="getImage"
                accept="image/*"
                onChange={handleFileChange}
              />
            </FileInputLabel>
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
          </ModalInputRow>
        </ModalSection>
        <ModalSection>
          <ModalTitle>혼획물 어획 일시</ModalTitle>
          <ModalInputRow>
            <ModalLabel htmlFor="getDate">어획 날짜</ModalLabel>
            <input
              type="date"
              id="getDate"
              value={form.getDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, getDate: e.target.value }))
              }
              style={{
                width: 180,
                padding: "12px 16px",
                border: "1px solid #dbe4ee",
                borderRadius: 8,
                fontSize: 15,
                color: "#888",
                background: "white",
              }}
            />
          </ModalInputRow>
          <ModalInputRow>
            <ModalLabel htmlFor="getTime">어획 시간</ModalLabel>
            <input
              type="time"
              id="getTime"
              value={form.getTime}
              onChange={(e) =>
                setForm((f) => ({ ...f, getTime: e.target.value }))
              }
              style={{
                width: 120,
                padding: "12px 16px",
                border: "1px solid #dbe4ee",
                borderRadius: 8,
                fontSize: 15,
                color: "#888",
                background: "white",
              }}
            />
          </ModalInputRow>
        </ModalSection>
        <ModalSection>
          <ModalTitle>수거 마감 일시</ModalTitle>
          <ModalInputRow>
            <ModalLabel htmlFor="limitDate">마감 날짜</ModalLabel>
            <input
              type="date"
              id="limitDate"
              value={form.limitDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, limitDate: e.target.value }))
              }
              style={{
                width: 180,
                padding: "12px 16px",
                border: "1px solid #dbe4ee",
                borderRadius: 8,
                fontSize: 15,
                color: "#888",
                background: "white",
              }}
            />
          </ModalInputRow>
          <ModalInputRow>
            <ModalLabel htmlFor="limitTime">마감 시간</ModalLabel>
            <input
              type="time"
              id="limitTime"
              value={form.limitTime}
              onChange={(e) =>
                setForm((f) => ({ ...f, limitTime: e.target.value }))
              }
              style={{
                width: 120,
                padding: "12px 16px",
                border: "1px solid #dbe4ee",
                borderRadius: 8,
                fontSize: 15,
                color: "#888",
                background: "white",
              }}
            />
          </ModalInputRow>
        </ModalSection>
        <ModalButtonRow>
          <ModalButton onClick={onClose}>취소하기</ModalButton>
          <ModalButton $primary onClick={() => onSubmit(form)}>
            수정하기
          </ModalButton>
        </ModalButtonRow>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditModal;
