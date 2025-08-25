import { hasToken, isTokenExpired } from "../utils/token";
import { logout } from "../utils/logout";
import { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import LeftSidebar from "../components/LeftSidebar";
import axios from "axios";
import DefaultImage from "../assets/profile/default.jpg";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import LogoutModal from "../components/LogoutModal";

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
    border-color: #0966ff;
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
  loginId: string;
  name: string;
  password: string;
  phoneNumber: string;
  mainAddress: string;
  detailAddress: string;
  postcode: string; // UI에서만 사용, 백엔드로 전송하지 않음
};

function UpdateProfile() {
  const [formData, setFormData] = useState<FormDataType>({
    loginId: "",
    name: "",
    password: "",
    phoneNumber: "", // 방어적 초기값 추가
    mainAddress: "",
    detailAddress: "",
    postcode: "", // UI에서만 사용, 백엔드로 전송하지 않음
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const token = hasToken() ? localStorage.getItem("jwt") : null;
      const role = localStorage.getItem("role");

      if (!hasToken()) {
        setIsLogoutModalOpen(true);
        return;
      }
      if (role === "ROLE_FACTORY") {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/factory/mypage/profile`,
          token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
        );
        const data = response.data;
        setFormData({
          loginId: data.loginId ?? "",
          name: data.name ?? "",
          password: data.password ?? "",
          phoneNumber: data.phoneNumber ?? "",
          mainAddress: data.mainAddress ?? "",
          detailAddress: data.detailAddress ?? "",
          postcode: data.postCode,
        });
      } else {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/fisher/mypage/profile`,
          token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
        );
        const data = response.data;
        setFormData({
          loginId: data.loginId ?? "",
          name: data.name ?? "",
          password: data.password ?? "",
          phoneNumber: data.phoneNumber ?? "",
          mainAddress: data.mainAddress ?? "",
          detailAddress: data.detailAddress ?? "",
          postcode: data.postCode,
        });
      }
    } catch (error) {
      if (isTokenExpired(error)) {
        setIsLogoutModalOpen(true);
      } else {
        console.error("Error fetching user data:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "phone1") {
      setPhone1(value);
      setFormData((prev) => ({
        ...prev,
        phoneNumber: `${value}-${prev.phoneNumber.split("-")[1] || ""}-${
          prev.phoneNumber.split("-")[2] || ""
        }`,
      }));
    } else if (name === "phone2") {
      setPhone2(value);
      setFormData((prev) => ({
        ...prev,
        phoneNumber: `${prev.phoneNumber.split("-")[0] || ""}-${value}-${
          prev.phoneNumber.split("-")[2] || ""
        }`,
      }));
    } else if (name === "phone3") {
      setPhone3(value);
      setFormData((prev) => ({
        ...prev,
        phoneNumber: `${prev.phoneNumber.split("-")[0] || ""}-${
          prev.phoneNumber.split("-")[1] || ""
        }-${value}`,
      }));
    } else if (name === "newPassword") {
      setNewPassword(value);
      // 실시간 validation
      if (confirmPassword && value !== confirmPassword) {
        setPasswordError("비밀번호가 일치하지 않습니다");
      } else {
        setPasswordError("");
      }
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      if (newPassword && value !== newPassword) {
        setPasswordError("비밀번호가 일치하지 않습니다");
      } else {
        setPasswordError("");
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value ?? "",
      }));
    }
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
          const postcode = data.zonecode || data.postcode || "";
          const mainAddr =
            data.address || data.roadAddress || data.jibunAddress || "";
          setFormData((prev) => ({
            ...prev,
            mainAddress: mainAddr,
            postcode: postcode,
          }));
        },
      });
      postcode.open();
    } catch (err) {
      setIsErrorModalOpen(true);
      setErrorMessage(
        "우편번호 검색을 사용할 수 없습니다. 네트워크를 확인해주세요."
      );
    }
  };

  const handleSave = async () => {
    if (
      !formData.phoneNumber.trim() ||
      !formData.mainAddress.trim() ||
      !formData.detailAddress.trim() ||
      !formData.postcode.trim()
    ) {
      setIsErrorModalOpen(true);
      setErrorMessage("모든 항목을 입력해주세요");
      return;
    }

    // 새 비밀번호 입력이 있을 때만 검증
    if (newPassword || confirmPassword) {
      if (!newPassword.trim() || !confirmPassword.trim()) {
        setIsErrorModalOpen(true);
        setErrorMessage("비밀번호를 모두 입력해주세요");
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordError("비밀번호가 일치하지 않습니다");
        setIsErrorModalOpen(true);
        setErrorMessage("비밀번호가 일치하지 않습니다");
        return;
      }
    }

    // 비밀번호 입력 시만 password 포함
    const payload: any = {
      phoneNumber: formData.phoneNumber,
      mainAddress: formData.mainAddress,
      detailAddress: formData.detailAddress,
    };

    // 새 비밀번호 입력이 없으면 빈 문자열로 password를 포함해서 전송
    if (!newPassword && !confirmPassword) {
      payload.password = "";
    } else if (newPassword && confirmPassword && newPassword === confirmPassword) {
      payload.password = newPassword;
    }

    try {
      const token = localStorage.getItem("jwt");
      const role = localStorage.getItem("role");
      const url =
        role === "ROLE_FACTORY"
          ? `${import.meta.env.VITE_API_URL}/factory/mypage/profile`
          : `${import.meta.env.VITE_API_URL}/fisher/mypage/profile`;
      await axios.put(
        url,
        payload,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      setIsSuccessModalOpen(true);
      fetchUserData();
    } catch (err) {
      setIsErrorModalOpen(true);
      setErrorMessage("프로필 저장에 실패했습니다.");
    }
  };

  // 모달 닫기 핸들러
  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    window.location.reload();
  };

  const handleErrorModalClose = () => setIsErrorModalOpen(false);

  // 최초 마운트 시 한 번만 fetchUserData 호출
  useEffect(() => {
    fetchUserData();
  }, []);


  useEffect(() => {
    if (formData.phoneNumber) {
      const parts = formData.phoneNumber.split("-");
      setPhone1(parts[0] || "");
      setPhone2(parts[1] || "");
      setPhone3(parts[2] || "");
    }
  }, [formData.phoneNumber]);

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
        <LeftSidebar activeMenu="profile" />
        <MainContent>
          <FormContainer>
            <ProfileSection>
              <ProfileImageContainer>
                <ProfileImage />
              </ProfileImageContainer>
              <ProfileName>{formData.name}</ProfileName>
            </ProfileSection>

            <FormGroup>
              <Label htmlFor="loginId">아이디</Label>
              <Input
                type="text"
                id="loginId"
                name="loginId"
                value={formData.loginId ?? ""}
                onChange={handleInputChange}
                readOnly
                style={{ backgroundColor: "#f8f9fa" }}
                disabled
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="newPassword">새 비밀번호</Label>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleInputChange}
                placeholder="새 비밀번호를 입력하세요"
              />
            </FormGroup>
            <FormGroup style={{ position: "relative" }}>
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <div style={{ position: "relative", width: "100%" }}>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 다시 입력하세요"
                  onFocus={() => setShowTooltip(true)}
                  onBlur={() => setShowTooltip(false)}
                  style={passwordError ? { borderColor: "red" } : {}}
                  aria-describedby={
                    passwordError ? "password-error-tooltip" : undefined
                  }
                />
                {passwordError && showTooltip && (
                  <span
                    id="password-error-tooltip"
                    style={{
                      position: "absolute",
                      left: "100%",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "#f44336",
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      zIndex: 10,
                      marginLeft: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    {passwordError}
                  </span>
                )}
              </div>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phoneNumber">연락처</Label>
              <PhoneGroup>
                <Input
                  type="text"
                  name="phone1"
                  value={phone1}
                  onChange={handleInputChange}
                  maxLength={3}
                />
                <Input
                  type="text"
                  name="phone2"
                  value={phone2}
                  onChange={handleInputChange}
                  maxLength={4}
                />
                <Input
                  type="text"
                  name="phone3"
                  value={phone3}
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
                    placeholder="우편번호"
                    value={formData.postcode ?? ""}
                    readOnly
                    disabled
                    style={{
                      flex: 1,
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                  <PostcodeButton type="button" onClick={handlePostcodeSearch}>
                    우편번호 검색
                  </PostcodeButton>
                </PostcodeRow>

                <Input
                  type="text"
                  id="mainAddress"
                  name="mainAddress"
                  value={formData.mainAddress ?? ""}
                  readOnly
                  disabled
                  style={{ backgroundColor: "#f8f9fa" }}
                  placeholder="기본 주소"
                />

                <Input
                  type="text"
                  id="detailAddress"
                  name="detailAddress"
                  value={formData.detailAddress ?? ""}
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
