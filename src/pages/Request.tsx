import { hasToken, isTokenExpired } from "../utils/token";
import { logout } from "../utils/logout";
import { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import LeftSidebar from "../components/LeftSidebar";
import AcceptModal from "../components/AcceptModal";
import axios from "axios";

const MypageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #0966ff;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 60px;
  color: #999;

  /* Subhead */
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #e9ecef;
  margin: 24px 0;
`;

const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 30px;
  border-radius: 16px;
  padding: 40px;
`;

const MainContent = styled.div`
  flex: 1;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  font-size: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: white;
`;

const TableHeaderCell = styled.th`
  padding: 16px 12px;
  text-align: center;
  font-weight: 600;
  color: #666;
  border-bottom: 2px solid #e0e0e0;
`;

const TableRow = styled.tr`
  &:hover {
    background: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 24px 12px;
  color: #333;
  text-align: center;
`;

const ActionButton = styled.button`
  padding: 8px 36px;
  background-color: white;
  color: #0966ff;
  border: 2px solid #0966ff;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

type RequestRow = {
  factoryId: any;
  articleId: any;
  factoryName: string;
  phoneNumber: string;
  requestDate: string;
  fishInfo: Array<{ species: string; quantity: number }>;
  // Add other fields if needed
};

function Request() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestData, setRequestData] = useState<RequestRow[]>([]);
  const [selectedRow, setSelectedRow] = useState<RequestRow | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAcceptClick = (row: RequestRow) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    if (!selectedRow || !selectedRow.articleId) {
      alert("articleId가 없습니다.");
      return;
    }
    try {
      const token = localStorage.getItem("jwt");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/fisher/mypage`,
        { articleId: selectedRow.articleId, factoryId: selectedRow.factoryId },
        token
          ? {
              headers: { Authorization: `Bearer ${token}` },
              data: {
                articleId: selectedRow.articleId,
                factoryId: selectedRow.factoryId,
              },
            }
          : undefined
      );
      // 성공 시 모달 닫고 데이터 새로고침
      setIsModalOpen(false);
      fetchRequestData();
    } catch (error) {
      alert("매칭 수락에 실패했습니다.");
    }
  };

  const fetchRequestData = async () => {
    setIsLoading(true);
    try {
      // localStorage에서 JWT 토큰 가져오기
      const token = hasToken() ? localStorage.getItem("jwt") : null;
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/fisher/mypage`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      setRequestData(
        response.data.map((item: any) => ({
          factoryId: item.factoryId,
          articleId: item.articleId,
          factoryName: item.factoryName,
          phoneNumber: item.phoneNumber,
          requestDate: item.requestDate,
          fishInfo: item.fishInfo,
        }))
      );
    } catch (error) {
      if (isTokenExpired(error)) {
        logout();
      } 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestData();
  }, []);

  return (
    <MypageContainer>
      {isLoading && <LoadingSpinner />}
      <Title>마이페이지</Title>
      <Subtitle>
        마이페이지에서 등록, 조회, 거래 내역을 한눈에 확인하세요.
      </Subtitle>
      <Divider />
      <ContentSection>
        <LeftSidebar activeMenu="request" />
        <MainContent>
          <SectionHeader>
            <SectionTitle>
              매칭 신청 내역
              <span
                style={{ color: "gray", fontSize: "14px", marginLeft: "8px" }}
              >
                (최신순)
              </span>
            </SectionTitle>
          </SectionHeader>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>담당자</TableHeaderCell>
                  <TableHeaderCell>연락처</TableHeaderCell>
                  <TableHeaderCell>매칭 신청 일시</TableHeaderCell>
                  <TableHeaderCell>매칭 신청 내용</TableHeaderCell>
                  <TableHeaderCell></TableHeaderCell>
                </tr>
              </TableHeader>
              <tbody>
                {requestData.length === 0 ? (
                  <tr>
                    <TableCell
                      colSpan={5}
                      style={{
                        textAlign: "center",
                        color: "#999",
                        padding: "48px 0",
                      }}
                    >
                      매칭 신청 내역이 없습니다.
                    </TableCell>
                  </tr>
                ) : (
                  requestData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.factoryName}</TableCell>
                      <TableCell>{row.phoneNumber}</TableCell>
                      <TableCell>{row.requestDate}</TableCell>
                      <TableCell>
                        {typeof row.fishInfo === "object" &&
                        row.fishInfo !== null
                          ? Object.entries(row.fishInfo)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(", ")
                          : row.fishInfo}
                      </TableCell>
                      <TableCell>
                        <ActionButton onClick={() => handleAcceptClick(row)}>
                          매칭 수락하기
                        </ActionButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </tbody>
            </Table>
          </TableContainer>
        </MainContent>
      </ContentSection>
      <AcceptModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        factoryName={selectedRow?.factoryName ?? ""}
        phoneNumber={selectedRow?.phoneNumber ?? ""}
        fishInfo={
          selectedRow?.fishInfo
            ? typeof selectedRow.fishInfo === "object"
              ? Object.entries(selectedRow.fishInfo).map(
                  ([species, quantity]) => `${species}: ${quantity}`
                )
              : selectedRow.fishInfo
            : []
        }
      />
    </MypageContainer>
  );
}

export default Request;
