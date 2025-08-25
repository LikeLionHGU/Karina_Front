import { useEffect, useState } from "react";
import { hasToken, isTokenExpired } from "../utils/token";
import LoadingSpinner from "../components/LoadingSpinner";
import { logout } from "../utils/logout";
import styled from "styled-components";
import LocationImg from "../assets/icons/LocationIcon.svg";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import LogoutModal from "../components/LogoutModal";
import axios from "axios";
type FishInfo = Record<string, number | string>;
interface FishData {
  video?: string;
  thumbnail?: string;
  fishName?: string;
  fishInfo?: FishInfo;
  mainAddress?: string;
  detailAddress?: string;
  fisherName?: string;
  phoneNumber?: string;
  getDate?: string;
  getTime?: string;
  limitDate?: string;
  limitTime?: string;
  status?: "매칭 대기" | "매칭 중" | "매칭 완료" | string;
}
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
  color: #0966ff;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 24px;

  &:hover {
    text-decoration: none;
  }
`;

const ContentCard = styled.div`
  background: #f4f8fe;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 4fr 3fr;
  min-height: 750px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LocationIcon = styled.span`
  display: flex;
  align-items: center;
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
  max-width: 600px;
  min-width: 320px;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 40px;
`;

const FishVideo = styled.video`
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 360px;
  object-fit: contain;
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

const InfoTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: black;
  margin-bottom: 32px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 40px 50px;
`;

const InfoLabel = styled.div`
  color: #0966ff;
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
  background: #0966ff;
  z-index: 2;
  width: calc(${(props) => props.progress}% - 30px);
  max-width: calc(100% - 30px);
  transition: width 0.3s ease;
`;

const StatusStep = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  position: relative;
`;

const StatusDot = styled.div<{ $active: boolean; $completed: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${(props) =>
    props.$completed || props.$active ? "#0966FF" : "#e0e0e0"};
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
    display: ${(props) =>
      props.$completed || props.$active ? "block" : "none"};
  }
`;

const StatusLabel = styled.span<{ $active: boolean }>`
  font-size: 12px;
  color: ${(props) => (props.$active ? "#0966FF" : "#666")};
  font-weight: ${(props) => (props.$active ? "600" : "normal")};
  text-align: center;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #0966ff;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #0752cc;
  }

  &:disabled {
   opacity: 0.6;
   cursor: not-allowed;
   background: #7aa8ff;
 }
`;

const FallbackImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const LocationIconImg = styled.img`
  width: 18px;
  height: 18px;
`;

function Detail() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState("매칭 신청을 하시겠습니까 ?");
  const [modalBody, setModalBody] = useState(
    "어민 분의 확인 후 매칭이 성사될 예정입니다."
  );
  const [fishData, setFishData] = useState<FishData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);
  const { articleId } = useParams();

  const statusSteps = [
    { label: "매칭 대기", key: "매칭 대기" },
    { label: "매칭 중", key: "매칭 중" },
    { label: "매칭 완료", key: "매칭 완료" },
  ];

  /* 어종, 이름, 연락처, 어획 일시, 마감 일시 */
  const infoRows = [
  { label: "어종", value:
    fishData.fishInfo
      ? Object.entries(fishData.fishInfo).map(([name, count]) => `${name}: ${count}`).join(", ")
      : "-" },
  { label: "이름", value: fishData.fisherName ?? "-" },
  { label: "연락처", value: fishData.phoneNumber ?? "-" },
  { label: "어획 일시", value: `${fishData.getDate ?? ""} ${fishData.getTime ?? ""}`.trim() || "-" },
  { label: "마감 일시", value: `${fishData.limitDate ?? ""} ${fishData.limitTime ?? ""}`.trim() || "-" },
];
  const getFishData = async () => {
    setIsLoading(true);
    try {
      const token = hasToken() ? localStorage.getItem("jwt") : null;
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/factory/detail/${articleId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );
      setFishData(response.data);
    } catch (error) {
      if (isTokenExpired(error)) {
        setIsLogoutModalOpen(true);
      } else {
        console.error("Error fetching fish detail data:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!articleId) {
      return;
    }
    getFishData();
  }, [articleId]);

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex((step) => step.key === status);
  };

  const getStatusProgress = (currentStatus: string) => {
    const idx = getStatusIndex(currentStatus);
    return idx >= 0 ? (idx / (statusSteps.length - 1)) * 100 : 0;
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

  const handleModalConfirm = async () => {
    try {
      const token = localStorage.getItem("jwt");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/factory/detail`,
        { articleId: articleId },
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      setIsSuccess(true);
      setModalTitle("신청이 정상적으로 완료되었습니다.");
      setModalBody("어민 분의 확인 후 매칭이 성사될 예정입니다.");
    } catch (error) {
      setIsSuccess(false);
      setModalTitle("신청에 실패했습니다.");
      setModalBody("다시 시도해 주세요.");
    }
  };

  return (
    <DetailContainer>
      {isLoading && <LoadingSpinner />}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => {
          setIsLogoutModalOpen(false);
          setIsLogoutSuccess(false);
        }}
        onConfirm={() => {
          setIsLogoutSuccess(true);
          logout();
        }}
        title="로그아웃 하시겠습니까?"
        body="토큰이 만료되어 로그아웃됩니다."
        isSuccess={isLogoutSuccess}
      />
      <BackButton onClick={() => navigate(-1)}>← 뒤로 가기</BackButton>

      <ContentCard>
        <FishVideoContainer>
          {fishData.video ? (
            <FishVideo controls>
              <source src={fishData.video} type="video/mp4" />
            </FishVideo>
          ) : (
            <FallbackImage
              src={
                fishData.thumbnail ||
                "https://via.placeholder.com/800x600.png?text=Video+not+supported"
              }
              alt={fishData.fishName || ""}
            />
          )}

          <StatusSection>
            <StatusTracker>
              <StatusLine />
              <StatusProgressLine
                progress={getStatusProgress(fishData.status ?? "")}
              />
              {statusSteps.map((step, index) => {
                const currentIdx = getStatusIndex(fishData.status ?? "");
                return (
                  <StatusStep
                    key={step.key}
                    $active={index === currentIdx}
                    $completed={index < currentIdx}
                  >
                    <StatusDot
                      $active={index === currentIdx}
                      $completed={index < currentIdx}
                    />
                    <StatusLabel $active={index === currentIdx}>
                      {step.label}
                    </StatusLabel>
                  </StatusStep>
                );
              })}
            </StatusTracker>
          </StatusSection>
        </FishVideoContainer>

        <InfoContainer>
          <LocationContainer>
            <LocationIcon>
              <LocationIconImg src={LocationImg} alt="위치" />
            </LocationIcon>
            <LocationText>
              {fishData.mainAddress ?? ""} {fishData.detailAddress ?? ""}
            </LocationText>
          </LocationContainer>

          <FishTitle>{fishData.fishName}</FishTitle>

          <InfoSection>
            <InfoTitle>
              {fishData.fishInfo
                ? Object.entries(fishData.fishInfo)
                    .map(([name, count]) => `${name}`)
                    .join(", ")
                : "-"}{" "}
            </InfoTitle>
            <InfoGrid>
              {infoRows.map(({ label, value }) => (
                <>
                  <InfoLabel key={`${label}-label`}>{label}</InfoLabel>
                  <InfoValue key={`${label}-value`}>{value}</InfoValue>
                </>
              ))}
          </InfoGrid>
          </InfoSection>
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
