import { useState } from "react";
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

const FormContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #f0f0f0;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: #999;
  margin-bottom: 8px;
`;

const ProfileChangeButton = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #357abd;
  }
`;

const ProfileName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 8px 0 4px 0;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PhoneGroup = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 1fr;
  gap: 8px;
  align-items: end;
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background: white;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
`;

const AddressButton = styled.button`
  background: #f8f9fa;
  color: #666;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background: white;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const SaveButton = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #357abd;
  }
`;

function UpdateProfile() {
  const [formData, setFormData] = useState({
    id: "Karina0717",
    name: "카리나",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    phone1: "010",
    phone2: "5028",
    phone3: "0717",
    address: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("저장된 정보:", formData);
    // 여기에 API 호출 로직을 추가할 수 있습니다
    alert("회원 정보가 성공적으로 업데이트되었습니다!");
  };

  return (
    <MypageContainer>
      <Title>마이페이지</Title>
      <Subtitle>마이페이지에서 매칭, 수주, 거래 내역을 관리해 보세요</Subtitle>
      <hr />
      <ContentSection>
        <LeftSidebar activeMenu="profile" />
        <MainContent>
          <SectionHeader>
            <SectionTitle>회원 정보 수정</SectionTitle>
          </SectionHeader>

          <FormContainer>
            <ProfileSection>
              <ProfileImageContainer>
                <ProfileImage>👤</ProfileImage>
                <ProfileChangeButton>파일 찾기 수정</ProfileChangeButton>
              </ProfileImageContainer>
              <ProfileName>카리나</ProfileName>
            </ProfileSection>

            <FormGroup>
              <Label htmlFor="id">아이디</Label>
              <Input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                readOnly
                style={{ backgroundColor: "#f8f9fa" }}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="currentPassword">비밀번호</Label>
              <Input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력하세요"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="newPassword">비밀번호</Label>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="비밀번호를 다시 입력해주세요"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">연락처</Label>
              <PhoneGroup>
                <Select
                  name="phone1"
                  value={formData.phone1}
                  onChange={handleInputChange}
                >
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                  <option value="017">017</option>
                  <option value="018">018</option>
                  <option value="019">019</option>
                </Select>
                <Input
                  type="text"
                  name="phone2"
                  value={formData.phone2}
                  onChange={handleInputChange}
                  placeholder="5028"
                  maxLength={4}
                />
                <Input
                  type="text"
                  name="phone3"
                  value={formData.phone3}
                  onChange={handleInputChange}
                  placeholder="0717"
                  maxLength={4}
                />
              </PhoneGroup>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address">주소</Label>
              <FormRow>
                <AddressButton type="button">우편번호 검색</AddressButton>
                <div></div>
              </FormRow>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="상세 주소를 입력하세요"
                style={{ marginTop: "8px" }}
              />
            </FormGroup>

            <SaveButton onClick={handleSave}>저장하기</SaveButton>
          </FormContainer>
        </MainContent>
      </ContentSection>
    </MypageContainer>
  );
}

export default UpdateProfile;
