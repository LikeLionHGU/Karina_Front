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
  color: #333;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 60px;
  color: #999;
  font-size: 14px;
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
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: #f8f9fa;
`;

const TableHeaderCell = styled.th`
  padding: 16px 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
`;

const TableRow = styled.tr`
  &:hover {
    background: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 16px 12px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
`;

const ActionButton = styled.button`
  padding: 10px 30px 10px 30px;
  color: #357abd;
  background-color: #fff;
  border: 2px solid #4a90e2;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
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
      <Subtitle>마이페이지에서 매칭, 수주, 거래 내역을 관리해 보세요</Subtitle>
      <hr />
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
