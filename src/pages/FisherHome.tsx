import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import FishModal from "../components/FishModal";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 100px auto;
  padding: 60px 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const Highlight = styled.span`
  color: #0966ff;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 40px;
  color: var(--Black-2, #c7c7c7);

  /* Subhead */
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SearchContainer = styled.div`
  width: 60%;
  margin: 0 auto 40px auto;
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #4a90e2;
  border-radius: 25px;
  padding: 12px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;

  &::placeholder {
    color: #999;
  }
`;

const SearchIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;

  &::after {
    content: "🔍";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
  }
`;

const FishGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 16px;
  row-gap: 100px;
  margin-bottom: 40px;
`;

const FishCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const FishImageSection = styled.div`
  width: 100%;
  height: 160px;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a90e2;
  font-size: 40px;
  position: relative;
`;

const FishInfoSection = styled.div`
  padding: 20px;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  color: #666;
  font-size: 12px;
`;

const LocationIcon = styled.span`
  color: #4a90e2;
`;

const FishInfo = styled.div`
  margin-bottom: 30px;
  display: flex;
  gap: 20px;
`;

const FishName = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const FishDetails = styled.div`
  color: var(--Black-4, #454545);
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
`;

const StatusContainer = styled.div`
  margin-top: 16px;
`;

const StatusBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  height: 12px;
`;

const StatusLine = styled.div`
  position: absolute;
  top: 50%;
  left: 6px;
  right: 6px;
  height: 2px;
  background-color: #e0e0e0;
  z-index: 1;
  transform: translateY(-50%);
`;

const StatusProgressLine = styled.div<{ progress: number }>`
  position: absolute;
  top: 50%;
  left: 6px;
  height: 2px;
  background-color: #4a90e2;
  z-index: 2;
  width: calc(${(props) => props.progress}% - 12px);
  max-width: calc(100% - 12px);
  transition: width 0.3s ease;
  transform: translateY(-50%);
`;

const StatusDot = styled.div<{ isActive?: boolean; isCompleted?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => {
    if (props.isCompleted) return "#4a90e2"; // 완료된 단계: 꽉찬 파란색
    if (props.isActive) return "white"; // 현재 진행 단계: 가운데 비어있음
    return "#e0e0e0"; // 미완료 단계: 회색
  }};
  border: 2px solid
    ${(props) => {
      if (props.isCompleted || props.isActive) return "#4a90e2";
      return "#e0e0e0";
    }};
  z-index: 3;
  position: relative;
  box-sizing: border-box;
`;

const StatusLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #666;
  margin-top: 12px;
`;

const StatusLabel = styled.span<{ isActive?: boolean }>`
  color: ${(props) => (props.isActive ? "#4a90e2" : "#666")};
  font-weight: ${(props) => (props.isActive ? "700" : "normal")};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 100px;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  padding: 10px 14px;
  border: none;
  background-color: #f8f9fa;
  color: ${(props) => (props.isActive ? "#4a90e2" : "#666")};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  min-width: 40px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const PageEllipsis = styled.span`
  padding: 10px 4px;
  color: #999;
  font-size: 14px;
`;

function FisherHome() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFish, setSelectedFish] = useState<any>(null);
  const [allFishData, setAllFishData] = useState<any[]>([]);
  const itemsPerPage = 9;

  const getAllFishData = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/home`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      // API 응답 데이터로 allFishData 업데이트
      setAllFishData(response.data);
      console.log("Fetched fish data:", response.data);
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    }
  };

  useEffect(() => {
    getAllFishData();
  }, []);

  const totalPages = Math.ceil(allFishData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFishData = allFishData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCardClick: (fish: any) => void = (fish: any) => {
    // 모달 띄우기
    handleOpenModal(fish);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFish(null);
  };

  const handleOpenModal = (fish: any) => {
    setSelectedFish(fish);
    setIsModalOpen(true);
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    // 첫 번째 페이지들 (1, 2, 3, 4)
    for (let i = 1; i <= Math.min(4, totalPages); i++) {
      buttons.push(
        <PageButton
          key={i}
          isActive={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageButton>
      );
    }

    // ... 표시 (5페이지 이상일 때만)
    if (totalPages > 4) {
      buttons.push(<PageEllipsis key="ellipsis">...</PageEllipsis>);
    }

    // 마지막 페이지 (15페이지, 총 페이지가 5 이상일 때만)
    if (totalPages > 4) {
      buttons.push(
        <PageButton
          key={totalPages}
          isActive={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </PageButton>
      );
    }

    return buttons;
  };

  return (
    <Container>
      <Title>
        <Highlight>혼획물</Highlight> 검색하기
      </Title>
      <Subtitle>
        어민과 수요자를 스마트하게 매칭해주는 혼획물 유통 플랫폼
      </Subtitle>

      <SearchContainer>
        <SearchInput placeholder="검색어를 입력하세요" />
        <SearchIcon onClick={() => navigate("/search")} />
      </SearchContainer>

      <FishGrid>
        {currentFishData.map((fish, index) => (
          <FishCard key={index} onClick={() => handleCardClick(fish)}>
            <FishImageSection>{fish.thumbnail || "🐟"}</FishImageSection>
            <FishInfoSection>
              <LocationInfo>
                <LocationIcon>📍</LocationIcon>
                {fish.mainAddress} {fish.detailAddress}
              </LocationInfo>

              <FishInfo>
                <FishName>{fish.fishInfo[0]}</FishName>
                <FishDetails>
                  {fish.fisherName} • {fish.getDate}
                </FishDetails>
              </FishInfo>

              <StatusContainer>
                <StatusBar>
                  <StatusDot
                    isActive={fish.status >= 0}
                    isCompleted={fish.status > 0}
                  />
                  <StatusDot
                    isActive={fish.status >= 1}
                    isCompleted={fish.status > 1}
                  />
                  <StatusDot
                    isActive={fish.status >= 2}
                    isCompleted={fish.status >= 2}
                  />
                  <StatusLine />
                  <StatusProgressLine
                    progress={
                      fish.status === 0 ? 0 : fish.status === 1 ? 50 : 100
                    }
                  />
                </StatusBar>
                <StatusLabels>
                  <StatusLabel isActive={fish.status >= 0}>대기 중</StatusLabel>
                  <StatusLabel isActive={fish.status >= 1}>
                    매칭 대기
                  </StatusLabel>
                  <StatusLabel isActive={fish.status >= 2}>
                    매칭 완료
                  </StatusLabel>
                </StatusLabels>
              </StatusContainer>
            </FishInfoSection>
          </FishCard>
        ))}
      </FishGrid>

      <Pagination>{renderPaginationButtons()}</Pagination>

      {selectedFish && (
        <FishModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          fishData={selectedFish}
        />
      )}
    </Container>
  );
}

export default FisherHome;
