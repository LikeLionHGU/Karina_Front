import { useState, useEffect } from "react";
import styled from "styled-components";
import LeftSidebar from "../components/LeftSidebar";
import axios from "axios";
import DefaultImage from "../assets/profile/default.jpg";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";

const MypageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 180px 20px;
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
  padding: 40px;
`;

const MainContent = styled.div`
  flex: 1;
`;

const FormContainer = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  padding-top: 20px;
  padding-bottom: 30px;
  background-color: #f4f8fe;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 16px;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const ProfileImage = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: #999;
  margin-bottom: 8px;
  cursor: pointer;
  background-image: url(${DefaultImage});
  background-size: cover;
`;

const ProfileName = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin: 8px 0 4px 0;
`;

const PhoneGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  justify-self: start;
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  color: #333;
  background: white;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
`;

/* FormRow and AddressButton removed: replaced by AddressWrapper/PostcodeRow/PostcodeButton */

const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PostcodeRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

// PostcodeInput removed; use Input directly with flex style in JSX

const PostcodeButton = styled.button`
  width: 30%;
  background: white;
  color: #0966ff;
  border: 2px solid #0966ff;
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const FormGroup = styled.div`
  width: 70%;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: 20% 1fr;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
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
  background: #0966ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 36px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  display: block;
  margin: 100px auto 0;

  &:hover {
    background: #0752cc;
  }
`;

type FormDataType = {
  id: string;
  name: string;
  currentPassword: string;
  newPassword: string;
  phone1: string;
  phone2: string;
  phone3: string;
  postcode: string;
  mainAddress: string;
  detailAddress: string;
};

function UpdateProfile() {
  const [formData, setFormData] = useState<FormDataType>({
    id: "",
    name: "",
    currentPassword: "",
    newPassword: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    postcode: "",
    mainAddress: "",
    detailAddress: "",
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUserData = async () => {
    try {
      // localStorage에서 JWT 토큰 가져오기
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/mypage/profile`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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

  const loadDaumPostcodeScript = () =>
    new Promise<void>((resolve, reject) => {
      if ((window as any).daum && (window as any).daum.Postcode)
        return resolve();
      const script = document.createElement("script");
      script.src =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Failed to load Daum Postcode script"));
      document.head.appendChild(script);
    });

  const handlePostcodeSearch = async () => {
    try {
      await loadDaumPostcodeScript();
      const postcode = new (window as any).daum.Postcode({
        oncomplete: function (data: any) {
          // data.zonecode or data.postcode, and data.address or data.roadAddress
          const postcodeValue = data.zonecode || data.postcode || "";
          const mainAddr =
            data.address || data.roadAddress || data.jibunAddress || "";
          setFormData((prev) => ({
            ...prev,
            postcode: postcodeValue,
            mainAddress: mainAddr,
          }));
        },
      });
      postcode.open();
    } catch (err) {
      console.error("우편번호 스크립트 로드 실패", err);
      setIsErrorModalOpen(true);
      setErrorMessage(
        "우편번호 검색을 사용할 수 없습니다. 네트워크를 확인해주세요."
      );
    }
  };

  const handleSave = () => {
    console.log("저장된 정보:", formData);
    // 여기에 API 호출 로직을 추가할 수 있습니다
    setIsSuccessModalOpen(true);
    // 필요시 fetchUserData()로 최신 정보 다시 불러오기
    fetchUserData();
  };

  // 모달 닫기 핸들러
  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    // window.location.reload();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleErrorModalClose = () => setIsErrorModalOpen(false);

  return (
    <MypageContainer>
      <Title>마이페이지</Title>
      <Subtitle>
        마이페이지에서 등록, 조회, 거래 내역을 한눈에 확인하세요.
      </Subtitle>
      <Divider />
      <ContentSection>
        <LeftSidebar activeMenu="profile" />
        <MainContent>
          <FormContainer>
            <ProfileSection>
              <ProfileImageContainer>
                <ProfileImage></ProfileImage>
              </ProfileImageContainer>
              <ProfileName>{formData.name}</ProfileName>
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
                disabled
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="currentPassword">새 비밀번호</Label>
              <Input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="newPassword">비밀번호 확인</Label>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
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
                  maxLength={4}
                />
                <Input
                  type="text"
                  name="phone3"
                  value={formData.phone3}
                  onChange={handleInputChange}
                  maxLength={4}
                />
              </PhoneGroup>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address">주소</Label>
              <AddressWrapper>
                <PostcodeRow>
                  <Input
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    placeholder="우편번호"
                    style={{ flex: 1 }}
                  />
                  <PostcodeButton type="button" onClick={handlePostcodeSearch}>
                    우편번호 검색
                  </PostcodeButton>
                </PostcodeRow>

                <Input
                  type="text"
                  id="mainAddress"
                  name="mainAddress"
                  value={formData.mainAddress}
                  onChange={handleInputChange}
                  placeholder="기본 주소"
                />

                <Input
                  type="text"
                  id="detailAddress"
                  name="detailAddress"
                  value={formData.detailAddress}
                  onChange={handleInputChange}
                  placeholder="상세 주소를 입력해주세요"
                />
              </AddressWrapper>
            </FormGroup>

            <SaveButton onClick={handleSave}>저장하기</SaveButton>
          </FormContainer>
          {/* 성공/에러 모달 렌더링 */}
          <SuccessModal
            isOpen={isSuccessModalOpen}
            onClose={handleSuccessModalClose}
          />
          <ErrorModal
            isOpen={isErrorModalOpen}
            onClose={handleErrorModalClose}
            message={errorMessage}
          />
        </MainContent>
      </ContentSection>
    </MypageContainer>
  );
}

export default UpdateProfile;
