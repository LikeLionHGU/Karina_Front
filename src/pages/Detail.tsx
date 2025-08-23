import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import axios from "axios";

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 200px 0;
  background: #fff;
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

const FishVideoContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 40px;
`;

const FishVideo = styled.video`
  width: 100%;
  height: auto;
  object-fit: cover;
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
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState("매칭 신청을 하시겠습니까 ?");
  const [modalBody, setModalBody] = useState(
    "어민 분의 확인 후 매칭이 성사될 예정입니다."
  );
  const [fishData, setFishData] = useState<any>({});
  const { articleId } = useParams();

  const statusSteps = [
    { label: "대기 중", key: "waiting" },
    { label: "매칭 대기", key: "pending" },
    { label: "매칭 완료", key: "completed" },
  ];

  const getFishData = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/factory/detail/${articleId}`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      setFishData(response.data);
      console.log("Fetched fish detail data:", response.data);
    } catch (error) {
      console.error("Error fetching fish detail data:", error);
    }
  };

  useEffect(() => {
    getFishData();
  }, []);

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
        {/* 왼쪽: 영상 섹션 */}
        <FishVideoContainer>
          <FishVideo
            controls
            // poster={
            //   fishData.thumbnail ||
            //   "https://via.placeholder.com/800x600.png?text=Loading..."
            // }
          >
            <source src={fishData.video} type="video/mp4" />
            {/* 브라우저가 video를 지원하지 않으면 대체 텍스트/이미지 */}
            <img
              src="https://via.placeholder.com/800x600.png?text=Video+not+supported"
              alt={fishData.fishName || ""}
            />
          </FishVideo>

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
        </FishVideoContainer>

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
                      {String(value)}
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
