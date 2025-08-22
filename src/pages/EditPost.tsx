import styled from "styled-components";
import LeftSidebar from "../components/LeftSidebar";

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

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 12px;
  font-weight: 600;
  color: #0966ff;
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
  // 내가 쓴 글 데이터
  const myPosts = [
    {
      id: 1,
      fishType: "명태",
      postDate: "2025/07/23",
      time: "05:07",
      deadline: "2025/08/28",
      status: "매칭대기",
    },
    {
      id: 2,
      fishType: "가자미",
      postDate: "2025/07/23",
      time: "05:07",
      deadline: "2025/08/28",
      status: "매칭대기",
    },
    {
      id: 3,
      fishType: "명태",
      postDate: "2025/07/23",
      time: "05:07",
      deadline: "2025/08/28",
      status: "대기중",
    },
    {
      id: 4,
      fishType: "가자미",
      postDate: "2025/07/23",
      time: "05:07",
      deadline: "2025/08/28",
      status: "대기중",
    },
  ];

  // 매칭 완료된 글 데이터
  const completedPosts = [
    {
      id: 1,
      fishType: "광어",
      postDate: "2025/07/23",
      time: "05:07",
      deadline: "2025/08/28",
      status: "매칭완료",
    },
    {
      id: 2,
      fishType: "가자미",
      postDate: "2025/07/23",
      time: "05:07",
      deadline: "2025/08/28",
      status: "매칭완료",
    },
    {
      id: 3,
      fishType: "광어",
      postDate: "2025/07/23",
      time: "05:07",
      deadline: "2025/08/28",
      status: "매칭완료",
    },
    {
      id: 4,
      fishType: "가자미",
      postDate: "2025/07/23",
      time: "05:07",
      deadline: "2025/08/28",
      status: "매칭완료",
    },
  ];

  return (
    <MypageContainer>
      <Title>마이페이지</Title>
      <Subtitle>마이페이지에서 등록, 조회, 거래 내역을 한눈에 확인하세요.</Subtitle>
      <Divider />
      <ContentSection>
        <LeftSidebar activeMenu="posts" />
        <MainContent>
          {/* 내가 쓴 글 섹션 */}
          <Section>
            <SectionHeader>
              <SectionTitle>내가 쓴 글</SectionTitle>
              <ViewAllButton>더보기 &gt;</ViewAllButton>
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
                  {myPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>{post.fishType}</TableCell>
                      <TableCell>
                        {post.postDate} {post.time}
                      </TableCell>
                      <TableCell>{post.deadline}</TableCell>
                      <TableCell>
                        <StatusBadge status={post.status}>
                          {post.status}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <ActionButton>수정하기</ActionButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
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
                    <TableHeaderCell>수거 마감 일시</TableHeaderCell>
                    <TableHeaderCell>매칭 현황</TableHeaderCell>
                  </tr>
                </TableHeader>
                <tbody>
                  {completedPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>{post.fishType}</TableCell>
                      <TableCell>
                        {post.postDate} {post.time}
                      </TableCell>
                      <TableCell>{post.deadline}</TableCell>
                      <TableCell>
                        <StatusBadge status={post.status}>
                          {post.status}
                        </StatusBadge>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </Section>
        </MainContent>
      </ContentSection>
    </MypageContainer>
  );
}

export default EditPost;
