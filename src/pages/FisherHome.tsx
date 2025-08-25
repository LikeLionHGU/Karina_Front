import styled from "styled-components";
import { hasToken, isTokenExpired } from "../utils/token";
import { logout } from "../utils/logout";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import FishModal from "../components/FishModal";
import axios from "axios";
import SearchImg from "../assets/icons/SearchIcon.svg";
import LocationImg from "../assets/icons/LocationIcon.svg";
import LogoutModal from "../components/LogoutModal";

const Container = styled.div`
  width: 100%;
  max-width: 1500px;
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
  border: 2px solid #0966ff;
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
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
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

interface FishImageSectionProps {
  thumbnail?: string;
}

const FishImageSection = styled.div<FishImageSectionProps>`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  background-image: url(${(props) =>
    props.thumbnail ||
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23e3f2fd'/%3E%3Ctext x='200' y='125' font-family='Arial' font-size='60' text-anchor='middle' fill='%230966ff'%3E🐟%3C/text%3E%3C/svg%3E"});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0966ff;
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
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
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
  background-color: #0966ff;
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
    if (props.isCompleted) return "#0966ff"; // 완료된 단계: 꽉찬 파란색
    if (props.isActive) return "white"; // 현재 진행 단계: 가운데 비어있음
    return "#e0e0e0"; // 미완료 단계: 회색
  }};
  border: 2px solid
    ${(props) => {
      if (props.isCompleted || props.isActive) return "#0966ff";
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
  color: ${(props) => (props.isActive ? "#0966ff" : "#666")};
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
  color: ${(props) => (props.isActive ? "#0966ff" : "#666")};
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
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFish, setSelectedFish] = useState<any>(null);
  const [allFishData, setAllFishData] = useState<any[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);
  const itemsPerPage = 9;

  const getAllFishData = async () => {
    setIsLoading(true);
    try {
      const token = hasToken() ? localStorage.getItem("jwt") : null; // 위치 이동
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/fisher/home`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      setAllFishData(response.data);
      console.log("Fetched fish data:", response.data);
    } catch (error) {
      if (isTokenExpired(error)) {
        setIsLogoutModalOpen(true);
      } else {
        console.error("Error fetching homepage data:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllFishData();
  }, []);

  // 검색어로 필터링
  const filteredFishData =
    searchKeyword.trim() === ""
      ? allFishData
      : allFishData.filter((fish) => {
          // fishInfo는 객체이므로 value와 key 모두 검색
          const fishInfoStr = fish.fishInfo
            ? Object.entries(fish.fishInfo)
                .map(([name, count]) => `${name} ${count}`)
                .join(" ")
            : "";
          return (
            fishInfoStr.includes(searchKeyword) ||
            (fish.fisherName && fish.fisherName.includes(searchKeyword))
          );
        });

  const totalPages = Math.ceil(filteredFishData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFishData = filteredFishData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCardClick: (fish: any) => void = (fish: any) => {
    handleOpenModal(fish);
  };

  // status 문자열을 단계 숫자로 변환
  const getStatusStep = (status: string) => {
    switch (status) {
      case "대기 중":
        return 0;
      case "매칭 대기":
        return 1;
      case "매칭 완료":
        return 2;
      default:
        return 0;
    }
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
      <Title>
        <Highlight>혼획물</Highlight> 검색하기
      </Title>
      <Subtitle>
        어민과 수요자를 스마트하게 매칭해주는 혼획물 유통 플랫폼
      </Subtitle>

      <SearchContainer>
        <SearchInput
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchKeyword(e.currentTarget.value);
            }
          }}
        />
        <SearchIcon onClick={() => setSearchKeyword(searchKeyword)}>
          <img src={SearchImg} alt="검색" style={{ width: 20, height: 20 }} />
        </SearchIcon>
      </SearchContainer>
      <FishGrid>
        {currentFishData.map((fish, index) => {
          const statusStep = getStatusStep(fish.status);
          return (
            <FishCard key={index} onClick={() => handleCardClick(fish)}>
              <FishImageSection thumbnail={fish.thumbnail}>
                {fish.thumbnail ? "" : "🐟"}
              </FishImageSection>
              <FishInfoSection>
                <LocationInfo>
                  <LocationIcon>
                    <img
                      src={LocationImg}
                      alt="위치"
                      style={{ width: 20, height: 20 }}
                    />
                  </LocationIcon>
                  {fish.mainAddress}{" "}
                </LocationInfo>

                <FishInfo>
                  <FishName>
                    {/* 혼획물 종류와 수량 표시, 5글자 초과 시 ... */}
                    {(() => {
                      const fishInfoStr = fish.fishInfo
                        ? Object.entries(fish.fishInfo)
                            .map(([name, count]) => `${name} ${count}마리`)
                            .join(", ")
                        : "";
                      return fishInfoStr.length > 15
                        ? fishInfoStr.slice(0, 15) + "..."
                        : fishInfoStr;
                    })()}
                  </FishName>
                  <FishDetails>
                    {fish.fisherName} • {fish.postDate}
                  </FishDetails>
                </FishInfo>

                <StatusContainer>
                  <StatusBar>
                    <StatusDot
                      isActive={statusStep >= 0}
                      isCompleted={statusStep > 0}
                    />
                    <StatusDot
                      isActive={statusStep >= 1}
                      isCompleted={statusStep > 1}
                    />
                    <StatusDot
                      isActive={statusStep >= 2}
                      isCompleted={statusStep >= 2}
                    />
                    <StatusLine />
                    <StatusProgressLine
                      progress={
                        statusStep === 0 ? 0 : statusStep === 1 ? 50 : 100
                      }
                    />
                  </StatusBar>
                  <StatusLabels>
                    <StatusLabel isActive={statusStep >= 0}>
                      대기 중
                    </StatusLabel>
                    <StatusLabel isActive={statusStep >= 1}>
                      매칭 대기
                    </StatusLabel>
                    <StatusLabel isActive={statusStep >= 2}>
                      매칭 완료
                    </StatusLabel>
                  </StatusLabels>
                </StatusContainer>
              </FishInfoSection>
            </FishCard>
          );
        })}
      </FishGrid>

      <Pagination>{renderPaginationButtons()}</Pagination>

      {selectedFish && (
        <FishModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          fishData={{
            articleId: selectedFish.articleId || "",
            mainAddress: selectedFish.mainAddress || "",
            thumbnail: selectedFish.thumbnail || "",
            fishInfo: selectedFish.fishInfo || {},
            fisherName: selectedFish.fisherName || "",
            postDate: selectedFish.postDate || "",
            status: getStatusStep(selectedFish.status),
          }}
        />
      )}
    </Container>
  );
}

export default FisherHome;
