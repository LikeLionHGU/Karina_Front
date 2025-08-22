import React, { useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 200px 0;
  background: #FFF;
  min-height: 100vh;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #4a90e2;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 24px;

  &:hover {
    text-decoration: none;
  }
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 6fr 3fr;
  min-height: 750px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
`;

const LocationIcon = styled.span`
  color: #4a90e2;
  font-size: 16px;
`;

const LocationText = styled.span`
  color: #666;
  font-size: 14px;
`;

const FishTitle = styled.div`
  padding-left: 20px;
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 0 0 15px 0;
`;

const FishImageContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 40px;
`;

const FishImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: cover;
  margin-bottom: 50px;
`;

const InfoContainer = styled.div`
  padding: 70px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoSection = styled.div`
  margin-bottom: 40px;
  padding: 20px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 40px 50px;
`;

const InfoLabel = styled.div`
  color: #4a90e2;
  font-size: 18px;
  font-weight: 600;
`;

const InfoValue = styled.div`
  color: #333;
  font-size: 18px;
`;

const StatusSection = styled.div`
  margin-bottom: 30px;
  width: 100%;
`;

const StatusTracker = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0;
  width: 100%;
`;

const StatusLine = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  height: 2px;
  background: #e0e0e0;
  z-index: 1;
`;

const StatusProgressLine = styled.div<{ progress: number }>`
  position: absolute;
  top: 15px;
  left: 15px;
  height: 2px;
  background: #4a90e2;
  z-index: 2;
  width: calc(${(props) => props.progress}% - 30px);
  max-width: calc(100% - 30px);
  transition: width 0.3s ease;
`;

const StatusStep = styled.div<{ active: boolean; completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  position: relative;
`;

const StatusDot = styled.div<{ active: boolean; completed: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${(props) =>
    props.completed || props.active ? "#4a90e2" : "#e0e0e0"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  &::after {
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    display: ${(props) => (props.completed || props.active ? "block" : "none")};
  }
`;

const StatusLabel = styled.span<{ active: boolean }>`
  font-size: 12px;
  color: ${(props) => (props.active ? "#4a90e2" : "#666")};
  font-weight: ${(props) => (props.active ? "600" : "normal")};
  text-align: center;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #357abd;
  }
`;

function Detail() {
  const { fishId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState("매칭 신청을 하시겠습니까 ?");
  const [modalBody, setModalBody] = useState(
    "어민 분의 확인 후 매칭이 성사될 예정입니다."
  );

  // 실제 데이터는 API에서 가져와야 하지만, 예시 데이터 사용
  const fishData = {
    id: fishId || "1",
    location: "포항시 흥해읍 방등로 558 한동대학교",
    fishName: "청어리",
    image: "/api/placeholder/400/300",
    details: {
      이름: "청어리",
      "유저 ID": "kansas0717",
      어종: "청어리 67마리",
      "어획 시기": "2025. 08. 15\n7시 15분",
      연락처: "010-5036-0717",
      마감기한: "2025. 08. 15\n7시 15분",
    },
    status: 1, // 0: 대기 중, 1: 매입 대기, 2: 매입 완료
  };

  const statusSteps = [
    { label: "대기 중", key: "waiting" },
    { label: "매입 대기", key: "pending" },
    { label: "매입 완료", key: "completed" },
  ];

  const getStatusProgress = (currentStatus: number) => {
    return (currentStatus / (statusSteps.length - 1)) * 100;
  };

  const handleMatchingClick = () => {
    setIsSuccess(false);
    setModalTitle("매칭 신청을 하시겠습니까 ?");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
  };

  const handleModalConfirm = () => {
    // 성공 상태로 변경
    setIsSuccess(true);
    setModalTitle("신청이 정상적으로 완료되었습니다.");
    setModalBody("어민 분의 확인 후 매칭이 성사될 예정입니다.");
    // 모달은 열린 상태로 유지하여 성공 메시지 표시
  };

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>← 뒤로 가기</BackButton>

      <ContentCard>
        {/* 왼쪽: 이미지 섹션 */}
        <FishImageContainer>
          <FishImage
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt={fishData.fishName}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23e3f2fd'/><g><path d='M120 150 Q200 100 280 150 Q200 200 120 150 Z' fill='%234a90e2' opacity='0.8'/><circle cx='160' cy='140' r='3' fill='white'/><path d='M100 150 Q120 130 120 150 Q120 170 100 150 Z' fill='%234a90e2' opacity='0.6'/></g><text x='200' y='250' font-family='Arial' font-size='16' text-anchor='middle' fill='%234a90e2'>청어리</text></svg>";
            }}
          />

          <StatusSection>
            <StatusTracker>
              <StatusLine />
              <StatusProgressLine
                progress={getStatusProgress(fishData.status)}
              />
              {statusSteps.map((step, index) => (
                <StatusStep
                  key={step.key}
                  active={index === fishData.status}
                  completed={index < fishData.status}
                >
                  <StatusDot
                    active={index === fishData.status}
                    completed={index < fishData.status}
                  />
                  <StatusLabel active={index === fishData.status}>
                    {step.label}
                  </StatusLabel>
                </StatusStep>
              ))}
            </StatusTracker>
          </StatusSection>
        </FishImageContainer>

        {/* 오른쪽: 정보 섹션 */}
        <InfoContainer>
          <div>
            <LocationContainer>
              <LocationIcon>📍</LocationIcon>
              <LocationText>{fishData.location}</LocationText>
            </LocationContainer>

            <FishTitle>{fishData.fishName}</FishTitle>

            <InfoSection>
              <InfoGrid>
                {Object.entries(fishData.details).map(([label, value]) => (
                  <React.Fragment key={label}>
                    <InfoLabel>{label}</InfoLabel>
                    <InfoValue style={{ whiteSpace: "pre-line" }}>
                      {value}
                    </InfoValue>
                  </React.Fragment>
                ))}
              </InfoGrid>
            </InfoSection>
          </div>

          <ActionButton onClick={handleMatchingClick}>
            매칭 신청하기
          </ActionButton>
        </InfoContainer>
      </ContentCard>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        title={modalTitle}
        body={isSuccess ? modalBody : ""}
        isSuccess={isSuccess}
      />
    </DetailContainer>
  );
}

export default Detail;
