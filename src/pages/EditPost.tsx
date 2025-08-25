import { hasToken, isTokenExpired } from "../utils/token";
import { logout } from "../utils/logout";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import LeftSidebar from "../components/LeftSidebar";
import EditModal from "../components/EditModal";
import LogoutModal from "../components/LogoutModal";
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
  color: #0966ff;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 60px;
  color: #999;
  font-size: 14px;

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

function EditPost() {
  const [myPosts, setMyPosts] = useState<myPostRow[]>([]);
  const [completedPosts, setCompletedPosts] = useState<CompletedPostRow[]>([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editArticleId, setEditArticleId] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);

  type myPostRow = {
    articleId: any;
    fishInfo: Array<string>;
    getDate: string;
    getTime: string;
    limitDate: string;
    limitTime: string;
    status: string;
  };

  type CompletedPostRow = {
    articleId: any;
    fishInfo: Array<string>;
    getDate: string;
    getTime: string;
    limitDate: string;
    limitTime: string;
    status: string;
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    setIsLoading(true);
    try {
      const token = hasToken() ? localStorage.getItem("jwt") : null;
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/fisher/mypage/posts`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      setMyPosts(
        Array.isArray(response.data.incompleteArticle)
          ? response.data.incompleteArticle
          : response.data.incompleteArticle
          ? [response.data.incompleteArticle]
          : []
      );
      setCompletedPosts(
        Array.isArray(response.data.completeArticle)
          ? response.data.completeArticle
          : response.data.completeArticle
          ? [response.data.completeArticle]
          : []
      );
    } catch (error) {
      if (isTokenExpired(error)) {
        setIsLogoutModalOpen(true);
      } else {
        console.error("Error fetching post data:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (articleId: any) => {
    setEditArticleId(articleId);
    setIsEditModalOpen(true);

  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditArticleId(null);
  };

  const handleEditModalSubmit = async (form: any) => {
    if (!editArticleId) return;
    try {
      const token = localStorage.getItem("jwt");
      const info = {
        articleId: editArticleId,
        getDate: form.getDate,
        getTime: form.getTime,
        dateLimit: form.limitDate,
        timeLimit: form.limitTime,
      };
      const formData = new FormData();
      formData.append(
        "info",
        new Blob([JSON.stringify(info)], { type: "application/json" })
      );
      if (form.image) {
        formData.append("thumbnail", form.image, form.image.name);
      }
      await axios.put(
        `${import.meta.env.VITE_API_URL}/fisher/mypage/posts`,
        formData,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      fetchPostData();
    } catch (error) {
      if (isTokenExpired(error)) {
        logout();
      }
    }
    setIsEditModalOpen(false);
    setEditArticleId(null);
  };

  return (
    <MypageContainer>
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
      <Title>마이페이지</Title>
      <Subtitle>
        마이페이지에서 등록, 조회, 거래 내역을 한눈에 확인하세요.
      </Subtitle>
      <Divider />
      <ContentSection>
        <LeftSidebar activeMenu="posts" />
        <MainContent>
          <Section>
            <SectionHeader>
              <SectionTitle>내가 쓴 글</SectionTitle>
            </SectionHeader>
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>혼획물 종류</TableHeaderCell>
                    <TableHeaderCell>어획 일시</TableHeaderCell>
                    <TableHeaderCell>수거 마감 일시</TableHeaderCell>
                    <TableHeaderCell>매칭 현황</TableHeaderCell>
                    <TableHeaderCell></TableHeaderCell>
                  </tr>
                </TableHeader>
                <tbody>
                  {myPosts.length === 0 ? (
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
                    myPosts.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {Array.isArray(row.fishInfo)
                            ? row.fishInfo.join(", ")
                            : typeof row.fishInfo === "object" &&
                              row.fishInfo !== null
                            ? Object.entries(row.fishInfo)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(", ")
                            : row.fishInfo}
                        </TableCell>
                        <TableCell>
                          {row.getDate} {row.getTime}
                        </TableCell>
                        <TableCell>
                          {row.limitDate} {row.limitTime}
                        </TableCell>
                        <TableCell
                          style={{
                            color: row.status === "매칭 대기" ? "red" : "blue",
                          }}
                        >
                          {row.status}
                        </TableCell>
                        <TableCell>
                          <ActionButton
                            onClick={() => handleEdit(row.articleId)}
                          >
                            수정하기
                          </ActionButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </tbody>
              </Table>
            </TableContainer>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>매칭 완료된 글</SectionTitle>
            </SectionHeader>
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>혼획물 종류</TableHeaderCell>
                    <TableHeaderCell>어획 일시</TableHeaderCell>
                    <TableHeaderCell>수거 마감 일시</TableHeaderCell>
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
                        <TableCell>
                          {Array.isArray(row.fishInfo)
                            ? row.fishInfo.join(", ")
                            : typeof row.fishInfo === "object" &&
                              row.fishInfo !== null
                            ? Object.entries(row.fishInfo)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(", ")
                            : row.fishInfo}
                        </TableCell>
                        <TableCell>
                          {row.getDate} {row.getTime}
                        </TableCell>
                        <TableCell>
                          {row.limitDate} {row.limitTime}
                        </TableCell>
                        <TableCell style={{ color: "blue" }}>
                          {row.status}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </tbody>
              </Table>
            </TableContainer>
          </Section>
        </MainContent>
      </ContentSection>
      <EditModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSubmit={handleEditModalSubmit}
        articleId={editArticleId}
        initialData={
          myPosts.find((row) => row.articleId === editArticleId) || {}
        }
      />
    </MypageContainer>
  );
}

export default EditPost;
