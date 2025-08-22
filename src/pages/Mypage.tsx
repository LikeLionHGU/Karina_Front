import { useState } from "react";
import styled from "styled-components";
import LeftSidebar from "../components/LeftSidebar";
import AcceptModal from "../components/AcceptModal";

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

function Mypage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAcceptClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    // 매칭 수락 로직 처리
    console.log("매칭이 수락되었습니다!");
    setIsModalOpen(false);
    // 여기에 API 호출이나 상태 업데이트 로직을 추가할 수 있습니다
  };

  return (
    <MypageContainer>
      <Title>마이페이지</Title>
      <Subtitle>
        마이페이지에서 등록, 조회, 거래 내역을 한눈에 확인하세요.
      </Subtitle>
      <Divider />
      <ContentSection>
        <LeftSidebar activeMenu="alarm" />
        <MainContent>
          <SectionHeader>
            <SectionTitle>매칭 신청 내역</SectionTitle>
          </SectionHeader>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>기관명</TableHeaderCell>
                  <TableHeaderCell>담당자 정보</TableHeaderCell>
                  <TableHeaderCell>매칭 신청 일시</TableHeaderCell>
                  <TableHeaderCell>매칭 신청 내용</TableHeaderCell>
                  <TableHeaderCell></TableHeaderCell>
                </tr>
              </TableHeader>
              <tbody>
                <TableRow>
                  <TableCell>옥수수 연구소</TableCell>
                  <TableCell>박서연 010-5036-0717</TableCell>
                  <TableCell>2025 / 08 / 28</TableCell>
                  <TableCell>청어리 14667마리</TableCell>
                  <TableCell>
                    <ActionButton onClick={handleAcceptClick}>
                      매칭 수락하기
                    </ActionButton>
                  </TableCell>
                </TableRow>
              </tbody>
            </Table>
          </TableContainer>
        </MainContent>
      </ContentSection>

      <AcceptModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        instituteName="옥수수 연구소"
        contactInfo="박서연 010-5036-0717"
        fishDetails="청어리 14667마리"
      />
    </MypageContainer>
  );
}

export default Mypage;
