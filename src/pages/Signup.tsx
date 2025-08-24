import styles from "../styles/SignUp.module.css";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { hasToken, isTokenExpired } from "../utils/token";
import { logout } from "../utils/logout";
// 컴포넌트 상단 (TS라면)

export {};

declare global {
  interface Window {
    daum: any;
  }
}

const MemberRow = styled.div`
  width: 59.375vw;
  height: 72px;
  border-top: 2px solid var(--Secondary-5, #899ebb);
  display: flex; /* 추가 */
  align-items: stretch; /* 행 높이 꽉 채우기 */
  box-sizing: border-box;
`;

const MemberTitle = styled.div`
  width: 11.40625vw;
  height: 100%;
  flex-shrink: 0;
  background: var(--Secondary-1, #f4f8fe);
  display: flex; /* 추가 */
  align-items: center; /* 세로 가운데 */
  padding: 0 16px; /* 좌우 여백 */
  box-sizing: border-box;

  h1 {
    margin: 0; /* 기본 마진 제거 */
    color: var(--Black-4, #454545);
    font-size: 26px;
    font-weight: 600;
    line-height: 1; /* 혹은 72px로 고정해도 됨 */
  }
`;

const MemberContent = styled.div`
  flex: 1; /* 남은 공간 전부 차지 */
  display: flex;
  align-items: center;
  gap: 82px; /* 버튼 사이 간격 */
  padding: 0 16px;
  box-sizing: border-box;
`;

/*파일 컨테이너*/
const FileContent = styled.div`
  flex: 1; /* 남은 공간 전부 차지 */
  display: flex;
  align-items: center;
  gap: 10px; /* 버튼 사이 간격 */
  padding: 0 16px;
  box-sizing: border-box;

  span {
    color: var(--Secondary-5, #899ebb);
    font-size: clamp(15px, 1.6vw, 20px);
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 150% */
  }
`;

const HiddenFile = styled.input.attrs({ type: "file" })`
  display: none;
`;

const UploadBtn = styled.button`
  width: 181.886px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 2px solid var(--Primary-2, #0966ff);
  cursor: pointer;
  background: #fff;
  /*텍스트 css*/
  color: var(--Primary-2, #0966ff);
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

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
  border: 2px solid #8ba0bf; /* 외곽선 */
  border-radius: 50%;
  display: grid;
  place-content: center;
  cursor: pointer;
  background: #fff;

  /* 안쪽 점 */
  &::after {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transform: scale(0);
    transition: transform 120ms ease-in-out;
    background: #2f83f3;
  }

  &:checked {
    border-color: #2f83f3;
  }
  &:checked::after {
    transform: scale(1);
  }

  &:focus-visible {
    outline: 3px solid rgba(47, 131, 243, 0.3);
    outline-offset: 2px;
  }
`;

/*파일 업로드 되고 나서 뜨는 부분 컨테이너*/
const FileChip = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;
const FileIcon = styled(FontAwesomeIcon)`
  color: #bfc7d4; /* lightgray 비슷 */
  font-size: 50px;
  vertical-align: middle; /* 텍스트와 수직 정렬시 유용 */
`;

/*가입 정보 입력 배너(스타일 컴포넌트로 판단)*/

const InfoInputLine = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  margin: 0 auto;
  align-items: center;
`;
const InfoTitle = styled.h1`
  color: var(--Black-4, #454545);
  text-align: left; /* 라벨을 오른쪽 정렬 */
  font-size: clamp(15px, 2vw, 20px);
  font-weight: 600;
  line-height: 1.2;
  width: 100px;
  white-space: nowrap; /* 줄바꿈 금지 */
  word-break: keep-all; /* 한국어 단어 쪼개기 방지 */
`;

const InfoInput = styled.input`
  -webkit-appearance: none; /* 웹킷 브라우저에서 기본 스타일 제거 */
  -moz-appearance: none; /* 모질라 브라우저에서 기본 스타일 제거 */
  appearance: none; /* 기본 브라우저에서 기본 스타일 제거 */
  width: 38.23vw;
  height: 65px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1.5px solid var(--Secondary-3, #a5bee0);
  padding: 0 14px;

  &::placeholder {
    color: var(--Secondary-5, #899ebb);
    font-size: clamp(13px, 1.2vw, 17px);
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 150% */
  }
`;
/*전화번호 input창*/
const PhoneNumberInput = styled.input`
  -webkit-appearance: none; /* 웹킷 브라우저에서 기본 스타일 제거 */
  -moz-appearance: none; /* 모질라 브라우저에서 기본 스타일 제거 */
  appearance: none; /* 기본 브라우저에서 기본 스타일 제거 */
  width: 10.23vw;
  height: 65px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1.5px solid var(--Secondary-3, #a5bee0);

  &::placeholder {
    color: var(--Secondary-5, #899ebb);
    padding-left: 10px;
    font-size: clamp(13px, 1.2vw, 17px);
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 150% */
  }
`;
const IsSameBtn = styled.button`
  width: clamp(150px, 2vw, 200px);
  height: 65px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 2px solid var(--Primary-2, #0966ff);
  cursor: pointer;
  background: #fff;
  /*텍스트 css*/
  color: var(--Primary-2, #0966ff);
  font-size: clamp(15px, 2vw, 20px);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const PhoneContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const NumberLine = styled.div`
  width: 45px;
  height: 0;
  flex-shrink: 0;
  border-top: 1px solid var(--Secondary-3, #a5bee0);
`;

/*우편번호 검색*/
const SearchAddress = styled.button`
  width: clamp(150px, 2vw, 200px);
  height: 65px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 2px solid var(--Primary-2, #0966ff);
  cursor: pointer;
  background: #fff;
  /*텍스트 css*/
  color: var(--Primary-2, #0966ff);
  font-size: clamp(15px, 2vw, 20px);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(""); // 'factory' 또는 'fisher
  const [userId, setUserId] = useState("");
  const [idValid, setIdValid] = useState<boolean | null>(null);
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneFirst, setPhoneFirst] = useState("");
  const [phoneMiddle, setPhoneMiddle] = useState("");
  const [phoneEnd, setPhoneEnd] = useState("");
  const [postcode, setPostcode] = useState(""); // 백엔드 측에 보내줄 우편주소
  const [address1, setAddress1] = useState(""); // 도로명/지번 + (참고항목)
  const [detailAddress, setDetailAddress] = useState(""); // 사용자 입력
  const [mainAddress, setMainAddress] = useState(""); // 백엔드 측에 보내줄 주소
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validText, setValidText] = useState<string>(""); // 화면에 보여줄 텍스트

  useEffect(() => {
    if (window.daum?.Postcode) return; // 이미 로드됨
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const detailRef = useRef<HTMLInputElement>(null);

  // refs (자동 포커스 이동용)
  const firstRef = useRef<HTMLInputElement>(null);
  const middleRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);
  /*onChange로 받는 아이디 저장*/
  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  /*폰 넘버를 처음/중간/끝 으로 나누어 받음*/
  // 숫자만 유지하는 유틸
  const onlyDigits = (s: string) => s.replace(/\D/g, "");

  // handlers
  const handleFirstNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = onlyDigits(e.target.value).slice(0, 3); // 3자리
    setPhoneFirst(v);
    if (v.length === 3) middleRef.current?.focus(); // 자동 이동
  };

  const handleMiddleNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = onlyDigits(e.target.value).slice(0, 4); // 3~4자리
    setPhoneMiddle(v);
    if (v.length === 4) endRef.current?.focus();
  };

  const handleEndNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = onlyDigits(e.target.value).slice(0, 4); // 4자리
    setPhoneEnd(v);
  };
  /*파일 업로드 전 텍스트*/
  const helperText =
    isActive === "fisher"
      ? "어업허가증 카드를 캡처하여 사진을 업로드 해주세요."
      : isActive === "factory"
      ? "사업자 등록증 또는 공장등록 증명서를 업로드 해주세요."
      : "파일 또는 사진을 업로드 해주세요.";

  //이 코드 나주에 이해해서 쓰기
  const fileRef = useRef<HTMLInputElement>(null);
  /*파일 선택 관련 이벤트 관리*/
  const handleOpenFile: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    fileRef.current && (fileRef.current.value = ""); // 같은 파일 재선택 허용
    fileRef.current?.click(); //input태그와 버튼 태그 연결
  };

  /*핸들 이벤트(유저가 입력하고 값 저장)*/
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelectedFile(e.currentTarget.files?.[0] ?? null);
    console.log("업로드 파일:", selectedFile);
  };

  /* '00시'로 잘라내는 코드*/
  const extractMainCity = (data: any, addr: string) => {
    const sgg = (data.sigungu || "").trim(); // 예: "성남시 분당구", "포항시 북구", "제주시"
    // 2-1) sigungu에서 "○○시"만 추출
    const cityFromSgg = sgg.match(/([^ ]+시)/)?.[1];
    if (cityFromSgg) return cityFromSgg;

    // 2-2) 최후 수단: 전체 주소 문자열에서 "○○시" 찾기
    const cityFromAddr = addr.match(/([^ ]+시)/)?.[1];
    if (cityFromAddr) return cityFromAddr;

    // (선택) 시가 없는 지역은 군/구로 대체하고 싶다면 아래 사용
    const alt =
      sgg.match(/([^ ]+(군|구))/)?.[1] ||
      addr.match(/([^ ]+(군|구))/)?.[1] ||
      "";
    return alt;
  };

  /*우편번호 검색 코드*/
  const openPostcode = () => {
    if (!window.daum?.Postcode) return;

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        let addr = ""; // 기본 주소
        let extraAddr = ""; // 참고항목

        // 도로명/지번 분기
        addr =
          data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

        // 참고항목(법정동/건물명)
        if (data.userSelectedType === "R") {
          if (data.bname && /[동|로|가]$/g.test(data.bname))
            extraAddr += data.bname;
          if (data.buildingName && data.apartment === "Y")
            extraAddr += (extraAddr ? ", " : "") + data.buildingName;
          if (extraAddr) extraAddr = ` (${extraAddr})`;
        }
        setPostcode(data.zonecode); // 1번째 인풋
        setAddress1(addr + extraAddr); // 2번째 인풋
        const city = extractMainCity(data, addr);
        setMainAddress(city); // 00시 분리 함수 가져오기
        detailRef.current?.focus(); // 3번째 인풋으로 포커스
      },
    }).open(); // ← 기본 팝업(모달 느낌)로 열림
  };

  const onCheckId = async () => {
    const idPostData = {
      loginId: userId,
    };

    //form data 내용 확인
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register/idValidation`,
        idPostData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const data = response.data;
      setValidText(typeof data === "string" ? data : JSON.stringify(data));
      if (response.data !== "Valid") {
        setIdValid(false);
      } else {
        console.log(response.data);
        setIdValid(true);
      }
    } catch (error) {
      // 네트워크 오류 등 예외 발생 시
      alert("요청 중 오류가 발생했습니다.");
    }
  };
  const onSubmitFile: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    setIsLoading(true);
    if (!hasToken()) {
      logout();
      return;
    }
    const phoneHyphen = `${phoneFirst}-${phoneMiddle}-${phoneEnd}`;
    if (!selectedFile) {
      alert("인증 파일을 업로드해주세요.");
      setIsLoading(false);
      return;
    }
    const userPayload = {
      role: isActive,
      loginId: userId.trim(),
      password: userPassword,
      name: userName.trim(),
      phoneNumber: phoneHyphen,
      postCode: postcode,
      mainAddress: mainAddress,
      detailAddress: detailAddress.trim(),
    };
    const form = new FormData();
    form.append(
      "user",
      new Blob([JSON.stringify(userPayload)], { type: "application/json" })
    );
    if (selectedFile) {
      form.append("file", selectedFile, selectedFile.name);
    }
    try {
      for (let pair of form.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        form,
        {
          withCredentials: true,
        }
      );
      if (response.data !== "401error") {
        alert("회원가입 성공");
        navigate(`/login`);
      } else {
        alert("회원가입 실패. 다시 시도해주세요.");
      }
    } catch (error) {
      if (isTokenExpired(error)) {
        logout();
        return;
      }
      alert("요청 중 오류가 발생했습니다.");
    } finally {
      setUserId("");
      setUserPassword("");
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <section className={styles.signUpTitleContainer}>
        <h1>회원가입</h1>
        <p>잡어드림 회원가입 후 다양한 서비스를 경험해보세요.</p>
        <div className={styles.titleLine} />
      </section>

      <section className={styles.sectionContainer}>
        <h1>회원정보</h1>
        <MemberRow>
          <MemberTitle>
            <h1>회원구분</h1>
          </MemberTitle>
          <MemberContent>
            <MemberRadio>
              <RadioInput
                name="memberType"
                value="fisher"
                onClick={() => setIsActive("fisher")}
              />
              <span>어민</span>
            </MemberRadio>
            <MemberRadio>
              <RadioInput
                name="memberType"
                value="factory"
                onClick={() => setIsActive("factory")}
              />
              <span>공장 / 연구소</span>
            </MemberRadio>
          </MemberContent>
        </MemberRow>
        <MemberRow>
          <MemberTitle>
            <h1>회원인증</h1>
          </MemberTitle>
          <FileContent>
            {selectedFile ? (
              // 파일이 선택됐을 때: 파일칩 렌더
              <FileChip>
                {isActive === "fisher" ? ( //공장이냐, 어민이냐
                  <FileIcon icon={faImage} />
                ) : (
                  <FileIcon icon={faFile} />
                )}
                <div className={styles.fileChipText}>
                  <div className={styles.fileName}>{selectedFile.name}</div>
                  <div className={styles.fileStatus}>업로드 완료</div>
                </div>
              </FileChip>
            ) : (
              // 파일이 없을 때: 안내문 렌더
              <span>{helperText}</span>
            )}
            <HiddenFile ref={fileRef} type="file" onChange={handleFileChange} />
            <UploadBtn type="button" onClick={handleOpenFile}>
              파일 업로드
            </UploadBtn>
          </FileContent>
        </MemberRow>
      </section>

      <section className={styles.sectionContainer}>
        <div className={styles.userInfo}>
          <p className={styles.infoTitle}>가입 정보</p>
          <span>필수 항목이므로 반드시 입력해 주시기 바랍니다.</span>
        </div>
      </section>

      <section className={styles.infoInputContainer}>
        <InfoInputLine>
          <InfoTitle>아이디</InfoTitle>
          <div className={styles.idValid}>
            <InfoInput
              placeholder="아이디 입력 6~12자 이내 입력"
              type="text"
              value={userId}
              onChange={handleIdChange}
            />
            {idValid !== null && (
              <h1 className={styles.isValid}>
                {validText}
                {/*idValid ? "유효한 아이디 입니다." : "유효하지 않은 아이디 입니다."*/}
              </h1>
            )}
          </div>
          <IsSameBtn onClick={onCheckId}>중복확인</IsSameBtn>
        </InfoInputLine>
        <InfoInputLine>
          <InfoTitle>비밀번호</InfoTitle>
          <InfoInput
            placeholder="비밀번호는 영문/숫자/특수문자 2가지 이상 조합 8~20자 이내 입력"
            type="password"
            value={userPassword}
            onChange={handlePasswordChange}
          />
        </InfoInputLine>
        <InfoInputLine>
          <InfoTitle>이름</InfoTitle>
          <InfoInput
            placeholder="이름을 입력해 주세요"
            type="text"
            value={userName}
            onChange={handleNameChange}
          />
        </InfoInputLine>
        <InfoInputLine>
          <InfoTitle>전화번호</InfoTitle>
          <PhoneContainer>
            <PhoneNumberInput
              ref={firstRef}
              placeholder="010"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={3}
              value={phoneFirst}
              onChange={handleFirstNum}
            />
            <NumberLine />
            <PhoneNumberInput
              ref={middleRef}
              placeholder="0000"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={phoneMiddle}
              onChange={handleMiddleNum}
            />
            <NumberLine />
            <PhoneNumberInput
              ref={endRef}
              placeholder="0000"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={phoneEnd}
              onChange={handleEndNum}
            />
          </PhoneContainer>
        </InfoInputLine>

        <InfoInputLine>
          <InfoTitle>주소</InfoTitle>
          <div className={styles.addressInputBox}>
            {/* 1행: 우편번호 + 버튼 */}
            <div className={styles.addressSearchLine}>
              <InfoInput
                placeholder="우편번호"
                type="text"
                value={postcode}
                readOnly // 사용자가 직접 수정 못 하게
              />
              <SearchAddress type="button" onClick={openPostcode}>
                우편번호 검색
              </SearchAddress>
            </div>

            {/* 2행: 기본 주소(도로명/지번 + 참고항목) */}
            <InfoInput
              placeholder="주소"
              type="text"
              value={address1}
              readOnly
            />

            {/* 3행: 상세 주소(사용자 입력) */}
            <InfoInput
              ref={detailRef as any}
              placeholder="상세 주소를 입력해 주세요"
              type="text"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </div>
        </InfoInputLine>
      </section>
      {/*<div className = {styles.agreeTitle}>
        <span className = {styles.title}>개인정보수집동의</span>
        <span className = {styles.detail}>개인정보 수집 및 이용에 동의</span>
      </div>*/}

      <button className={styles.next} onClick={onSubmitFile}>
        다음
      </button>
    </>
  );
}

export default Signup;
