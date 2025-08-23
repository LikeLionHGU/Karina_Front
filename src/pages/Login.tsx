import styles from "../styles/FactoryLogin.module.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface BannerProps {
  active: boolean;
}

const Input = styled.input`
  -webkit-appearance: none; /* 웹킷 브라우저에서 기본 스타일 제거 */
  -moz-appearance: none; /* 모질라 브라우저에서 기본 스타일 제거 */
  appearance: none; /* 기본 브라우저에서 기본 스타일 제거 */
  width: 658px;
  height: 81px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1.5px solid var(--Secondary-3, #a5bee0);
  padding-left: 10px;
  &::placeholder {
    margin-left: 5px;
    color: var(--Secondary-5, #899ebb);
    font-size: clamp(15px, 1.5vw, 20px);
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 150% */
  }
`;
/*비밀번호&아이디 입력 칸*/
const InputAndTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const InputTitle = styled.h1`
  color: var(--Black-4, #454545);
  font-size: clamp(20px, 3vw, 26px);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 8px;
`;

/* 글자 및 배너를 감싸는 컴포넌트를 만들어 1:1 비율로 있도록 함 */
/* 동시에 이 컴포넌트에 폰트 CSS를 적용해 글자 컴포넌트를 따로 만들지 않음 */

const FactoryBanner = styled.div<BannerProps>`
  flex: 1; /* 부모 컨테이너에 flex가 적용되어 있을 때 1:1 비율로 공간을 차지 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 271px;
  height: 69px;
  flex-shrink: 0;
  border-radius: 40px;
  background: ${(props) => (props.active ? "#0966FF" : "#E6E6E6")};
  color: ${(props) => (props.active ? "var(--White-1, #F8FBFE)" : "#000")};
  font-size: clamp(20px, 2vw, 30px);
  font-style: normal;
  font-weight: 600;
  line-height: 45px;
  cursor: pointer;
`;

/*글자 및 배경 스타일 한 태그에 모아둠*/
const FisherBanner = styled.div<BannerProps>`
  flex: 1;
  /*폰트 세로&가로 중앙정렬*/
  display: flex;
  align-items: center;
  justify-content: center;
  width: 271px;
  height: 69px;
  flex-shrink: 0;
  border-radius: 40px;
  background: ${(props) => (props.active ? "#0966FF" : "#E6E6E6")};
  color: ${(props) => (props.active ? "var(--White-1, #F8FBFE)" : "#000")};
  font-size: clamp(20px, 2vw, 30px);
  font-style: normal;
  font-weight: 600;
  line-height: 45px;
  cursor: pointer;
`;
const LoginComplete = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 20px;
  width: 658px;
  height: 66px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--Primary-2, #0966ff);
  /*폰트 스타일 CSS*/
  h1 {
    color: #fff;
    font-size: clamp(20px, 3vw, 26px);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  /*호버*/
  &:hover {
    transition: all 0.3s ease;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(9, 102, 255, 0.3);
    cursor: pointer;
  }
`;
const SignUpText = styled(Link)`
  margin-bottom: 59px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--Secondary-4, #92a9c7);
  font-size: 20px;
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
  /*Styled-component에서 쓸 prpos의 변수 타입 지정*/

  const navigate = useNavigate();

  const [isActive, setIsActive] = useState("");
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  /*onChange로 받는 아이디 저장*/
  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };
  /*onChange로 받는 패스워드 저장*/
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };
  const handleToggle = (status: string) => {
    setIsActive(status);
  };
  /*placeholder 텍스트 변수 선언*/
  const helperText =
    isActive === "fisher"
      ? "잡아드림 어민 아이디를 입력하세요."
      : isActive === "factory"
      ? "잡아드림 공장/연구소 아이디를 입력하세요."
      : "역할을 선택해주세요.";

  /*버튼 텍스트 변수 선언*/
  const ButtonText =
    isActive === "fisher"
      ? "어민 로그인"
      : isActive === "factory"
      ? "공장/연구소 로그인"
      : "역할을 선택해주세요.";

  /*백엔드한테 데이터 보내기*/
  const onSubmitClick = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    const formData = new FormData();

    // 유저 아이디 추가
    formData.append("loginId", userId);

    //유저 비밀번호 추가
    formData.append("password", userPassword);

    //유저 타입 추가
    formData.append("role", isActive); //isActive에 역할 정보 들어있음

    //form data 내용 확인
    try {
      console.log("FormData 내용:");
      for (const [k, v] of formData.entries()) console.log(k, v);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        formData,
        { withCredentials: true }
      );

      //response로 받아올 토큰 저장
      const rawToken =
        res.headers["authorization"] || res.headers["Authorization"];
      const token = rawToken?.startsWith("Bearer ")
        ? rawToken.slice(7)
        : rawToken;
      const role = res.data.role;
      if (token) localStorage.setItem("jwt", token);
      localStorage.setItem("role", role) ?? "";

      // 성공 처리
      alert("로그인 성공");
      console.log("JWT:", token);
      console.log("Role:", role);
      {
        role === "ROLE_FACTORY"
          ? navigate("/FactoryHome")
          : navigate("/FisherHome");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        // 401 등 상태 기반 메시지
        if (err.response?.status === 401) {
          alert("아이디/비밀번호를 확인해 주세요.");
        } else {
          alert(`요청 실패 (${err.response?.status ?? "네트워크 오류"})`);
        }
        console.error(err.response);
      } else {
        alert("요청 중 오류가 발생했습니다.");
        console.error(err);
      }
    } finally {
      setUserId("");
      setUserPassword("");
    }
  };
  return (
    <>
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
            type="text"
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
