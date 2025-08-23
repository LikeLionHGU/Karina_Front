import styled from "styled-components";
import LeftSidebar from "../components/LeftSidebar";
import CancelModal from "../components/CancelModal";
import axios from "axios";
import { useEffect, useState } from "react";

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
  color: #333;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 60px;
  color: #999;
  font-size: 14px;
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

const Section = styled.div`
  margin-bottom: 100px;
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

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: #4a90e2;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #357abd;
  }
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

function Matching() {
  const [, setPostData] = useState<any>(null);
  const [currentPosts, setCurrentPosts] = useState<currentPostRow[]>([]);
  const [completedPosts, setCompletedPosts] = useState<CompletedPostRow[]>([]);

  // Modal state and handlers
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [, setEditArticleId] = useState<any>(null);

  type currentPostRow = {
    articleId: any;
    fishInfo: string;
    getDate: string;
    getTime: string;
    limitDate: string;
    limitTime: string;
    status: string;
  };

  type CompletedPostRow = {
    articleId: any;
    fishInfo: string;
    getDate: string;
    getTime: string;
    limitDate: string;
    limitTime: string;
    status: string;
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터 패칭
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    try {
      setPostData(null);
      setCurrentPosts([]);
      setCompletedPosts([]);
      // localStorage에서 JWT 토큰 가져오기
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/mypage/posts/`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      setPostData(response.data);
      setCurrentPosts(response.data.currentPosts);
      setCompletedPosts(response.data.completedPosts);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  const handleCancel = (articleId: any) => {
    setEditArticleId(articleId);
    setIsCancelModalOpen(true);
  };

  const handleCancelModalClose = () => {
    setIsCancelModalOpen(false);
    setEditArticleId(null);
  };

  const handleCancelModalSubmit = () => {
    // TODO: implement cancel submit logic using editArticleId
    setIsCancelModalOpen(false);
    setEditArticleId(null);
  };

  return (
    <MypageContainer>
      <Title>마이페이지</Title>
      <Subtitle>
        마이페이지에서 등록, 조회, 거래 내역을 한눈에 확인하세요.
      </Subtitle>
      <Divider />
      <ContentSection>
        <LeftSidebar activeMenu="matching" />
        <MainContent>
          {/* 내가 쓴 글 섹션 */}
          <Section>
            <SectionHeader>
              <SectionTitle>매칭 신청 현황 목록</SectionTitle>
              <ViewAllButton>더보기 &gt;</ViewAllButton>
            </SectionHeader>
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>혼획물 종류</TableHeaderCell>
                    <TableHeaderCell>어획 일시</TableHeaderCell>
                    <TableHeaderCell>수거 마감 기한</TableHeaderCell>
                    <TableHeaderCell>매칭 현황</TableHeaderCell>
                    <TableHeaderCell>취소하기</TableHeaderCell>
                  </tr>
                </TableHeader>
                <tbody>
                  {currentPosts.length === 0 ? (
                    <tr>
                      <TableCell
                        colSpan={4}
                        style={{
                          textAlign: "center",
                          color: "#999",
                          padding: "48px 0",
                        }}
                      >
                        작성한 글이 없습니다.
                      </TableCell>
                    </tr>
                  ) : (
                    currentPosts.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.fishInfo}</TableCell>
                        <TableCell>{row.getTime}</TableCell>
                        <TableCell>{row.limitDate}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>
                          <ActionButton
                            onClick={() => handleCancel(row.articleId)}
                          >
                            취소하기
                          </ActionButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </tbody>
                <CancelModal
                  isOpen={isCancelModalOpen}
                  onClose={handleCancelModalClose}
                  onConfirm={handleCancelModalSubmit}
                  title="매칭 취소"
                  body="정말로 매칭을 취소하시겠습니까?"
                />
              </Table>
            </TableContainer>
          </Section>

          {/* 매칭 완료된 글 섹션 */}
          <Section>
            <SectionHeader>
              <SectionTitle>매칭 완료된 글</SectionTitle>
              <ViewAllButton>더보기 &gt;</ViewAllButton>
            </SectionHeader>
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>혼획물 종류</TableHeaderCell>
                    <TableHeaderCell>어획 일시</TableHeaderCell>
                    <TableHeaderCell>수거 마감 기한</TableHeaderCell>
                    <TableHeaderCell>매칭 현황</TableHeaderCell>
                    <TableHeaderCell></TableHeaderCell>
                  </tr>
                </TableHeader>
                <tbody>
                  {completedPosts.length === 0 ? (
                    <tr>
                      <TableCell
                        colSpan={4}
                        style={{
                          textAlign: "center",
                          color: "#999",
                          padding: "48px 0",
                        }}
                      >
                        매칭 완료된 글이 없습니다.
                      </TableCell>
                    </tr>
                  ) : (
                    completedPosts.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.fishInfo}</TableCell>
                        <TableCell>{row.getTime}</TableCell>
                        <TableCell>{row.limitDate}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    ))
                  )}
                </tbody>
              </Table>
            </TableContainer>
          </Section>
        </MainContent>
      </ContentSection>
    </MypageContainer>
  );
}

export default Matching;
