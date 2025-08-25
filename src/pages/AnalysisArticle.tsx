import styled from "styled-components";
import styles from "../styles/AnalysisArticle.module.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorModal from "../components/ErrorModal";
import ConfirmModal from "../components/ConfirmModal";
import { hasToken, isTokenExpired } from "../utils/token";
import { logout } from "../utils/logout";
import LogoutModal from "../components/LogoutModal";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;
const InputTitle = styled.h1`
  color: var(--Black-4, #454545);
  font-size: clamp(15px, 2.5vw, 22px);
  font-weight: 600;
  line-height: 45px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center; // 그대로
  align-items: center;
  gap: 16px;
`;

const InputInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

/*파일 컨테이너*/
const FileContent = styled.div`
  width: fit-content; /* 남은 공간 전부 차지 */
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1.5px solid var(--Secondary-3, #a5bee0);
  height: 65px;
  gap: 10px; /* 버튼 사이 간격 */
  padding: 0 16px;
  box-sizing: border-box;

  span {
    white-space: nowrap;
    padding-right: 127px;
    color: var(--Secondary-5, #899ebb);
    font-size: clamp(10px, 1.6vw, 15px);
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 150% */
  }
`;
const HiddenFile = styled.input.attrs({ type: "file" })`
  display: none;
`;

const UploadBtn = styled.button`
  margin-left: 16px;
  width: 150px;
  height: 65px;
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
  font-weight: 600;
  line-height: normal;

  &:hover {
    background: var(--Primary-2, #0966ff);
    transform: translateY(-2px);
    transition: background-color 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    color: #fff;
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
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: min(50vw, 1180px);
`;

const DateAndTimeContainer = styled.div`
  display: flex;
  align-items: center;
  width: min(50vw, 1180px);
  margin-bottom: 47px;
`;
/*날짜 관련*/
const DateTitle = styled.div`
  white-space: nowrap;
  text-align: left;
  color: var(--Black-4, #454545);
  font-size: clamp(15px, 1.5vw, 20px);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-right: 47px;
`;
const DateContent = styled.input`
  width: min(50vw, 450px); /* 남은 공간 전부 차지 */
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1.5px solid var(--Secondary-3, #a5bee0);
  height: 65px;
  gap: 10px; /* 버튼 사이 간격 */
  padding: 0 16px;
  box-sizing: border-box;

  span {
    white-space: nowrap;
    padding-right: 127px;
    color: var(--Secondary-5, #899ebb);
    font-size: clamp(10px, 1.6vw, 15px);
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 150% */
  }
`;
/*마지막 완료 버튼*/
const CompleteSubmit = styled.div`
  margin: 120px auto 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 65px;
  flex-shrink: 0;
  border-radius: 15px;
  background: var(--Primary-2, #0966ff);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  /*텍스트 css */
  color: #fff;
  font-size: clamp(15px, 1.6vw, 20px);
  font-style: normal;
  font-weight: 600;
  line-height: 45px; /* 150% */
`;
type Params = { articleId?: string };

const AnalysisArticle = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null); //사진 파일 저장
  const fileRef = useRef<HTMLInputElement>(null);
  const [caughtDate, setCaughtDate] = useState<string>(""); //포획 날짜 데이터 저장
  const [caughtTime, setCaughtTime] = useState<string>(""); //포획 시간 데이터 저장
  const [pickUpDate, setPickUpDate] = useState<string>(""); //포획 날짜 데이터 저장
  const [pickUpTime, setPickUpTime] = useState<string>("");
  const { articleId } = useParams<Params>(); //articleId

  // ✅ 모달 상태
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [isLoading, setIsLoading] = useState(false); //로딩 스피너
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);
  /*파일 선택 관련 이벤트 관리*/
  const handleOpenFile: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    fileRef.current && (fileRef.current.value = ""); // 같은 파일 재선택 허용
    fileRef.current?.click(); //input태그와 버튼 태그 연결
  };

  /*핸들 이벤트(유저가 입력하고 값 저장)*/
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsLoading(true);
    setSelectedFile(e.currentTarget.files?.[0] ?? null);
    setIsLoading(false);
  };

  const handleClose = () => setErrorOpen(false);
  const handleSuccessClose = () => {
    setConfirmOpen(false);
    setIsSuccess(false);
    navigate("/article/end");
    };

  const openSuccess = (title: string, body: string) => {
    setModalTitle(title);
    setModalBody(body);
    setIsSuccess(true); // 확인 버튼 하나만
    setConfirmOpen(true);
  };
  //모달 상태 관리
  const openModal = (msg: string) => {
    setModalMsg(msg);
    setErrorOpen(true);
  };

  const isAllFilled = () =>
    !!( caughtDate && caughtTime && pickUpDate && pickUpTime);

  /*백엔드한테 보내는 데이터*/
  const onSubmitArticle = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!hasToken()) {
      setIsLogoutModalOpen(true);
      return;
    }
    if (!selectedFile) {
      openModal("사진 파일을 업로드 해주세요");
      return;
    }
    if (!isAllFilled()) {
      openModal("모든 정보를 입력해 주세요.");
      return;
    }
    const userPayload = {
      articleId: articleId,
      getDate: caughtDate,
      getTime: caughtTime,
      limitDate: pickUpDate,
      limitTime: pickUpTime,
    };
    const form = new FormData();
    const token = localStorage.getItem("jwt");
    form.append(
      "info",
      new Blob([JSON.stringify(userPayload)], { type: "application/json" })
    );
    if (selectedFile) {
      form.append("thumbnail", selectedFile, selectedFile.name);
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/fisher/post/info`,
        form,
        token
          ? {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          : undefined
      );
      if (response.data !== "401error") {
        openSuccess("신청 완료", "정상적으로 접수되었습니다.");
      } else {
        openModal("등록을 실패했습니다. 다시 시도해 주세요");
      }
    } catch (error) {
      if (isTokenExpired(error)) {
        setIsLogoutModalOpen(true);
        return;
      }
      openModal("요청 중 오류가 발생했습니다");
    }
  };
  return (
    <>
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
      <section className={styles.title}>
        <div className={styles.inner}>
          <div className={styles.text}>
            <p>사진을 업로드하고,</p>
            <p>수거 희망 날짜와 시간을 입력하세요!</p>
          </div>
          <div className={styles.underLine} />
        </div>
      </section>

      <div className={styles.PhotoUpolad}>
        <InputContainer>
          <InputBox>
            <InputInner>
              <InputTitle>사진 업로드</InputTitle>
              <ButtonContainer>
                <FileContent>
                  {selectedFile ? (
                    // 파일이 선택됐을 때: 파일칩 렌더
                    <FileChip>
                      <FileIcon icon={faImage} />
                      <div className={styles.fileChipText}>
                        <div className={styles.fileName}>
                          {selectedFile.name}
                        </div>
                        <div className={styles.fileStatus}>업로드 완료</div>
                      </div>
                    </FileChip>
                  ) : (
                    // 파일이 없을 때: 안내문 렌더
                    <span>썸네일에 필요한 사진을 업로드하세요.</span>
                  )}
                </FileContent>
                <HiddenFile
                  ref={fileRef}
                  type="file"
                  onChange={handleFileChange}
                />
                <UploadBtn type="button" onClick={handleOpenFile}>
                  파일 업로드
                </UploadBtn>
              </ButtonContainer>
            </InputInner>
          </InputBox>
        </InputContainer>
      </div>

      <div className={styles.catchDate}>
        <InputContainer>
          <InputBox>
            <InputInner>
              <InputTitle>혼획물 포획 일시</InputTitle>
              <DateAndTimeContainer>
                <DateTitle>포획 날짜</DateTitle>
                <DateContent
                  type="date"
                  value={caughtDate}
                  onChange={(e) => setCaughtDate(e.target.value)}
                />
              </DateAndTimeContainer>
              <DateAndTimeContainer>
                <DateTitle>포획 시간</DateTitle>
                <DateContent
                  type="time"
                  value={caughtTime}
                  onChange={(e) => setCaughtTime(e.target.value)}
                />
              </DateAndTimeContainer>
            </InputInner>
          </InputBox>
        </InputContainer>
      </div>

      <div className={styles.catchDate}>
        <InputContainer>
          <InputBox>
            <InputInner>
              <InputTitle>수거 마감 일시</InputTitle>
              <DateAndTimeContainer>
                <DateTitle>마감 날짜</DateTitle>
                <DateContent
                  type="date"
                  value={pickUpDate}
                  onChange={(e) => setPickUpDate(e.target.value)}
                />
              </DateAndTimeContainer>
              <DateAndTimeContainer>
                <DateTitle>마감 시간</DateTitle>
                <DateContent
                  type="time"
                  value={pickUpTime}
                  onChange={(e) => setPickUpTime(e.target.value)}
                />
              </DateAndTimeContainer>
            </InputInner>
          </InputBox>
        </InputContainer>
      </div>

      <CompleteSubmit onClick={onSubmitArticle}>등록 완료</CompleteSubmit>
      <ErrorModal
        isOpen={isErrorOpen}
        onClose={handleClose}
        message={modalMsg}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={handleSuccessClose}
        onConfirm={handleSuccessClose}
        title={modalTitle}
        body={modalBody}
        isSuccess={isSuccess}
      />
    </>
  );
};

export default AnalysisArticle;
