import styles from '../styles/SignUp.module.css';
import styled from "styled-components";
/*import { useNavigate } from "react-router-dom";*/
import { useState, useRef } from "react";
import axios from 'axios';
const MemberRow = styled.div`
  width: 59.375vw;
  height: 72px;
  border-top: 2px solid var(--Secondary-5, #899EBB);
  display: flex;              /* 추가 */
  align-items: stretch;       /* 행 높이 꽉 채우기 */
  box-sizing: border-box;
`;

const MemberTitle = styled.div`
  width: 11.40625vw;
  height: 100%;
  flex-shrink: 0;
  background: var(--Secondary-1, #F4F8FE);
  display: flex;              /* 추가 */
  align-items: center;        /* 세로 가운데 */
  padding: 0 16px;            /* 좌우 여백 */
  box-sizing: border-box;

  h1{
    margin: 0;                /* 기본 마진 제거 */
    color: var(--Black-4, #454545);
    font-size: 26px;
    font-weight: 600;
    line-height: 1;           /* 혹은 72px로 고정해도 됨 */
  }
`;

const MemberContent = styled.div`
  flex: 1;                /* 남은 공간 전부 차지 */
  display: flex;  
  align-items: center;  
  gap: 82px;              /* 버튼 사이 간격 */
  padding: 0 16px;
  box-sizing: border-box;
`

/*파일 컨테이너*/
const FileContent = styled.div`
  flex: 1;                /* 남은 공간 전부 차지 */
  display: flex;  
  align-items: center;  
  gap: 10px;              /* 버튼 사이 간격 */
  padding: 0 16px;
  box-sizing: border-box;
  
  span{
    color: var(--Secondary-5, #899EBB);
    font-size: clamp(15px, 1.6vw, 20px);
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 150% */
  }
`

const HiddenFile = styled.input.attrs({ type: 'file' })` 
  display:none; 
`

const UploadBtn = styled.button`
  width: 181.886px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 2px solid var(--Primary-2, #0966FF);
  cursor: pointer;
  background: #fff;
  /*텍스트 css*/
  color: var(--Primary-2, #0966FF);
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
/*const UploadBtn = styled.input.attrs({ type: "file" })`
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  width: 181.886px;
  height: 42px;
  flex-shrink: 0;
  width: 181.886px;
  height: 42px;
  flex-shrink: 0;
  display: grid;
  place-content: center;
  cursor: pointer;
  background: #fff;
  color: var(--Primary-2, #0966FF);
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`*/

const MemberRadio = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const RadioInput = styled.input.attrs({ type: "radio" })`
  /* 네이티브 스타일 제거 */
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  width: 24px;
  height: 24px;
  border: 2px solid #8ba0bf;        /* 외곽선 */
  border-radius: 50%;
  display: grid;
  place-content: center;
  cursor: pointer;
  background: #fff;

  /* 안쪽 점 */
  &::after{
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transform: scale(0);
    transition: transform 120ms ease-in-out;
    background: #2f83f3;
  }

  &:checked{
    border-color: #2f83f3;
  }
  &:checked::after{
    transform: scale(1);
  }

  &:focus-visible{
    outline: 3px solid rgba(47,131,243,.3);
    outline-offset: 2px;
  }
`;


function Signup() { 
  const [isActive, setIsActive] = useState('factory'); // 'factory' 또는 'fisher
  //이 코드 나주에 이해해서 쓰기
  const fileRef = useRef<HTMLInputElement>(null);
  const openFile = () => fileRef.current?.click();
  /*const onSubmitFile = async (event : React.MouseEvent<HTMLInputElement>) => {
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
};*/
  return (
    <>
      <section className={styles.signUpTitleContainer}>
        <h1>회원가입</h1>
        <p>잡어드림 회원가입 후 다양한 서비스를 경험해보세요.</p>
        <div className={styles.titleLine} />
      </section>

      <section className={styles.membertypeContainer}>
        <h1>회원정보</h1>
        <MemberRow>
          <MemberTitle>
            <h1>회원구분</h1>
          </MemberTitle>
          <MemberContent>
            <MemberRadio>
              <RadioInput name="memberType" value="fisher" onClick={() => setIsActive('fisher')} />
              <span>어민</span>
            </MemberRadio>
            <MemberRadio>
              <RadioInput name="memberType" value="factory" onClick={() => setIsActive('factory')}/>
              <span>공장 / 연구소</span>
            </MemberRadio>
          </MemberContent>
        </MemberRow>
        <MemberRow>
          <MemberTitle>
            <h1>회원인증</h1>
          </MemberTitle>
          <FileContent>
            {isActive === 'fisher' ?
              <span>
                어업허가증 카드를 캡처하여 사진을 업로드 해주세요.
              </span>
              : <span>
                사업자 등록증 또는 공장등록 증명서를 업로드 해주세요.
                </span> 
            }
            <HiddenFile ref={fileRef}/>
            <UploadBtn type="button" onClick={openFile}>파일 업로드</UploadBtn>
          </FileContent>
        </MemberRow>
      </section>
    </>

  );
}

export default Signup;