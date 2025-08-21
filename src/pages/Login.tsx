import styles from '../styles/FactoryLogin.module.css';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState} from "react";
import axios from "axios";

function Login() {
  /*Styled-component에서 쓸 prpos의 변수 타입 지정*/
  interface BannerProps {
    active: boolean;
  }
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('factory'); // 'factory' 또는 'fisher'
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  /*onChange로 받는 아이디 저장*/
  const handleIdChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };
  /*onChange로 받는 패스워드 저장*/
  const handlePasswordChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };
  const handleToggle = (status: string) => {
    setIsActive(status);
  };

  /* 글자 및 배너를 감싸는 컴포넌트를 만들어 1:1 비율로 있도록 함 */
  /* 동시에 이 컴포넌트에 폰트 CSS를 적용해 글자 컴포넌트를 따로 만들지 않음 */

  const FactoryBanner = styled.div<BannerProps>`
    flex: 1; /* 부모 컨테이너에 flex가 적용되어 있을 때 1:1 비율로 공간을 차지 */
    padding-left:7px;
    display:flex;
    align-items: center;
    justify-content: center;
    width: 271px;
    height: 69px;
    flex-shrink: 0;
    border-radius: 40px;
    background: ${props => (props.active ? '#0966FF' : '#E6E6E6')};
    color: ${props => (props.active ? 'var(--White-1, #F8FBFE)' : '#000')};
    font-size: clamp(20px, 2vw, 30px);
    font-style: normal;
    font-weight: 600;
    line-height: 45px;
    cursor: pointer;
  `

  /*글자 및 배경 스타일 한 태그에 모아둠*/
  const FisherBanner = styled.div<BannerProps>`
    flex: 1;
    /*폰트 세로&가로 중앙정렬*/
    display:flex;
    align-items: center;
    justify-content: center;
    width: 271px;
    height: 69px;
    flex-shrink: 0;
    border-radius: 40px;
    background: ${props => (props.active ? '#0966FF' : '#E6E6E6')};
    color: ${props => (props.active ? 'var(--White-1, #F8FBFE)' : '#000')};
    font-size: clamp(20px, 2vw, 30px);
    font-style: normal;
    font-weight: 600;
    line-height: 45px;
    cursor: pointer;
  `
  /*비밀번호&아이디 입력 칸*/
  const InputAndTitle = styled.div`
    display:flex;
    flex-direction:column;
    gap:8px;
  `
  const Input = styled.input`
    -webkit-appearance: none; /* 웹킷 브라우저에서 기본 스타일 제거 */
    -moz-appearance: none; /* 모질라 브라우저에서 기본 스타일 제거 */
    appearance: none; /* 기본 브라우저에서 기본 스타일 제거 */
    width: 658px;
    height: 81px;
    flex-shrink: 0;
    border-radius: 20px;
    border: 1.5px solid var(--Secondary-3, #A5BEE0);
    padding-left: 10px;
    &::placeholder {
      margin-left: 5px;
      color: var(--Secondary-5, #899EBB);
      font-size: clamp(15px, 1.5vw, 20px);
      font-style: normal;
      font-weight: 700;
      line-height: 30px; /* 150% */
    }
  `
  const InputTitle = styled.h1`
    color: var(--Black-4, #454545);
    font-size: clamp(20px, 3vw, 26px);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 8px;
  `

  const LoginComplete = styled.div`
    margin: 0 auto;
    display:flex;
    align-items: center;
    justify-content: center;
    margin-top:127px;
    width: 658px;
    height: 66px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--Primary-2, #0966FF);
    /*푸터와의 간격*/
    margin-bottom:133px;
    /*폰트 스타일 CSS*/
     h1{
        color: #FFF;
        font-size: clamp(20px, 3vw, 26px);
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    /*호버*/
    &:hover{
    transition: all 0.3s ease;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(9, 102, 255, 0.3);
    cursor: pointer;
    }
 `
/*백엔드한테 데이터 보내기*/
const onSubmitClick = async (event : React.MouseEvent<HTMLInputElement>) => {
  event.preventDefault();
  const formData = new FormData();

  // 유저 아이디 추가
  formData.append("loginId", userId)

  //유저 비밀번호 추가
  formData.append("password", userPassword );
  
  //유저 타입 추가
  formData.append("role", isActive ); //isActive에 역할 정보 들어있음

  //form data 내용 확인
  try {
    console.log("FormData 내용:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    const response = await axios.post(`https://javadream.info/login`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

     if (response.data !== "401error") {
      alert("로그인 성공");
      localStorage.setItem("response", response.data);
      navigate(`/Home`);
    } else {
      alert("업로드 실패. 다시 시도해주세요.");
    } 
    } catch (error) {
        // 네트워크 오류 등 예외 발생 시
        alert("요청 중 오류가 발생했습니다.");
    } finally {
    setUserId(""); // 입력 필드 초기화
    setUserPassword("");
  }
};
  return (
    <>
      <div className={styles.FactoryLoginHeader}>
        <h1>로그인</h1>
        <div className={styles.LoginToggle}>
          <FactoryBanner active={isActive === 'factory'} onClick={() => handleToggle('factory')}>
            공장/연구소
          </FactoryBanner>
          <FisherBanner active={isActive === 'fisher'} onClick={() => handleToggle('fisher')}>
            어민
          </FisherBanner>
        </div>
      </div>
      <section className={styles.IdAndPassword}>
      <InputAndTitle>
        <InputTitle>아이디</InputTitle>
          <Input
            placeholder={isActive === 'fisher' ? "잡아드림 어민 아이디를 입력하세요." : "잡아드림 공장/연구소 아이디를 입력하세요."}
            type="text"
            value={userId}   // value 대신 defaultValue 사용
            onChange={handleIdChange}
          />
      </InputAndTitle>
        <InputAndTitle>
          <InputTitle>비밀번호</InputTitle>
          <Input placeholder="비밀번호를 입력하세요."
            type="text"
            value={userPassword}
            onChange={handlePasswordChange} />
        </InputAndTitle>
      </section>
      {isActive === 'fisher' ?
        <LoginComplete onClick = {onSubmitClick}>
          <h1>
            어민 로그인
          </h1>
        </LoginComplete>
        :<LoginComplete onClick = {onSubmitClick}>
          <h1>
            공장 / 연구소 로그인
          </h1>
        </LoginComplete>
      }
    </>
  );
}

export default Login;