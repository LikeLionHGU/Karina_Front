import styles from "../styles/Login.module.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ErrorModal from "../components/ErrorModal";
import ConfirmModal from "../components/ConfirmModal";

interface BannerProps {
  active: boolean;
}

const Input = styled.input`
  width:clamp(450px, 10vw, 550px);
  height: 55px;
  font-size: 16px;
  border-radius: 12px;
  border: 1.5px solid var(--Secondary-3, #a5bee0);
  padding-left: 10px;
  &::placeholder {
    font-size: 14px;
  }
`;

const InputAndTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputTitle = styled.h1`
  font-size: clamp(15px, 3vw, 20px);
  margin-bottom: 4px;
  color: var(--Black-4, #454545);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const FactoryBanner = styled.div<BannerProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 20px;
  background: ${(props) => (props.active ? "#0966FF" : "#E6E6E6")};
  color: ${(props) => (props.active ? "var(--White-1, #F8FBFE)" : "#000")};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  cursor: pointer;
`;

const FisherBanner = styled.div<BannerProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 20px;
  background: ${(props) => (props.active ? "#0966FF" : "#E6E6E6")};
  color: ${(props) => (props.active ? "var(--White-1, #F8FBFE)" : "#000")};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  cursor: pointer;
`;

const LoginComplete = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
  width: clamp(450px, 10vw, 550px);
  height: 50px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--Primary-2, #0966ff);
  h1 {
    font-size: 18px;
    color: #fff;
    font-style: normal;
    font-weight: 600; 
    line-height: normal;
  }
  &:hover {
    transition: all 0.3s ease;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(9, 102, 255, 0.3);
    cursor: pointer;
  }
`;

const SignUpText = styled(Link)`
  font-size: 14px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--Secondary-4, #92a9c7);
  font-weight: 600;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Login() {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState("");
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };
  const handleToggle = (status: string) => {
    setIsActive(status);
  };
  const helperText =
    isActive === "fisher"
      ? "잡아드림 어민 아이디를 입력하세요."
      : isActive === "factory"
      ? "잡아드림 공장/연구소 아이디를 입력하세요."
      : "역할을 선택해주세요.";

  const ButtonText =
    isActive === "fisher"
      ? "어민 로그인"
      : isActive === "factory"
      ? "공장/연구소 로그인"
      : "역할을 선택해주세요.";

  const onSubmitClick = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("loginId", userId);
    formData.append("password", userPassword);
    formData.append("role", isActive);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        formData,
        { withCredentials: true }
      );

      const rawToken =
        res.headers["authorization"] || res.headers["Authorization"];
      const token = rawToken?.startsWith("Bearer ")
        ? rawToken.slice(7)
        : rawToken;
      const role = res.data.role;
      const userName = res.data.userName;
      if (token) localStorage.setItem("jwt", token);
      localStorage.setItem("role", role) ?? "";
      localStorage.setItem("userName", userName) ?? "";

      setConfirmMessage("로그인 성공");
      setConfirmModalOpen(true);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          if (isActive === "") {
            setErrorMessage("역할을 선택해 주세요");
          } else {
            setErrorMessage("아이디/비밀번호를 확인해 주세요.");
          }
          setErrorModalOpen(true);
        } else {
          setErrorMessage(`요청 실패 (${err.response?.status ?? "네트워크 오류"})`);
          setErrorModalOpen(true);
        }
      } else {
        setErrorMessage("요청 중 오류가 발생했습니다.");
        setErrorModalOpen(true);
      }
    } finally {
      setUserId("");
      setUserPassword("");
    }
  };

  const handleConfirmClose = () => {
    setConfirmModalOpen(false);
    const role = localStorage.getItem("role");
    if (role === "ROLE_FACTORY") {
      navigate("/home/factory");
    } else {
      navigate("/home/fisher");
    }
  };

  const handleErrorClose = () => {
    setErrorModalOpen(false);
  };

  return (
    <>
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={handleErrorClose}
        message={errorMessage}
      />
      <ConfirmModal
        isOpen={confirmModalOpen}
        title="로그인 성공"
        body={confirmMessage}
        isSuccess                              // 단일 버튼 모드
        singleText="완료"                      // '확인' → '완료'
        onClose={handleConfirmClose}           // 눌렀을 때 닫힘
        onConfirm={handleConfirmClose}         // 타입 충족용(사용되지 않음)
      />

      <div className={styles.FactoryLoginHeader}>
        <h1>로그인</h1>
        <div className={styles.LoginToggle}>
          <FactoryBanner
            active={isActive === "factory"}
            onClick={() => handleToggle("factory")}
          >
            공장/연구소
          </FactoryBanner>
          <FisherBanner
            active={isActive === "fisher"}
            onClick={() => handleToggle("fisher")}
          >
            어민
          </FisherBanner>
        </div>
      </div>
      <section className={styles.IdAndPassword}>
        <InputAndTitle>
          <InputTitle>아이디</InputTitle>
          <Input
            placeholder={helperText}
            type="text"
            value={userId}
            onChange={handleIdChange}
          />
        </InputAndTitle>
        <InputAndTitle>
          <InputTitle>비밀번호</InputTitle>
          <Input
            placeholder={
              isActive === ""
                ? "역할을 선택해 주세요."
                : "비밀번호를 입력하세요."
            }
            type="password"
            value={userPassword}
            onChange={handlePasswordChange}
          />
        </InputAndTitle>
      </section>
      <ButtonContainer>
        <LoginComplete onClick={onSubmitClick}>
          <h1>{ButtonText}</h1>
        </LoginComplete>
        <SignUpText to="/signup">회원가입</SignUpText>
      </ButtonContainer>
    </>
  );
}

export default Login;
