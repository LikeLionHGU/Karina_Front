import styled from "styled-components";
import styles from "../styles/AnalysisArticle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { useState, useRef, useEffect } from "react";
const InputContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:25px;
`
const InputTitle = styled.h1`
    color: var(--Black-4, #454545);
    font-size: clamp(15px, 2.5vw, 20px);
    font-style: normal;
    font-weight: 600;
    line-height: 45px; /* 150% */
`
const InputInner = styled.div`
    width:65vw;
`
const InputLine = styled.div`
    display:flex;
`
/*파일 컨테이너*/
const FileContent = styled.div`
    width: fit-content;                /* 남은 공간 전부 차지 */
    display: flex;  
    align-items: center;
    border-radius: 5px;
    border: 1.5px solid var(--Secondary-3, #A5BEE0);
    height: 40px;  
    gap: 10px;              /* 버튼 사이 간격 */
    padding: 0 16px;
    box-sizing: border-box;
    
    span{
        white-space: nowrap;
        padding-right:127px;
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
    margin-left:16px;
    width: 150px;
    height: 40px;
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
    font-weight: 600;
    line-height: normal;
`
/*파일 업로드 되고 나서 뜨는 부분 컨테이너*/
const FileChip = styled.div`
  display:flex;
  align-items: center;
  gap:11px;

`
const FileIcon = styled(FontAwesomeIcon)`
  color: #bfc7d4;          /* lightgray 비슷 */
  font-size: 50px;
  vertical-align: middle;  /* 텍스트와 수직 정렬시 유용 */
`

/*날짜 및 시간 입력*/
const DateInput = styled.input.attrs({ type: 'date' })`
  /* 스타일 */
  width: fit-content;
  height: 40px;
  border: 1px solid #A5BEE0;
  border-radius: 6px;
  padding: 0 10px;
`;

/*날짜 및 시간 input창 이름*/
const DateInputTitle = styled.h1`
    color: var(--Black-4, #454545);
    font-size: clamp(12px, 1.6vw, 17px);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left:47px;
`

function AnalysisArticle () {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
        console.log('업로드 파일:', selectedFile);
    };

    return (
        <>
            <section className={styles.title}>
                <div className={styles.inner}>
                    <div className={styles.text}>
                    <p>사진을 업로드하고,</p>
                    <p>수거 희망 날짜와 시간을 입력하세요!</p>
                    </div>
                    <div className={styles.underLine} />
                </div>
            </section>

            <div className = {styles.PhotoUpolad}>
                <InputContainer>
                    <InputInner>
                        <InputTitle>사진 업로드</InputTitle>
                        <InputLine>
                            <FileContent>
                                {selectedFile ? (
                                    // 파일이 선택됐을 때: 파일칩 렌더
                                    <FileChip>
                                        <FileIcon icon={faImage} /> 
                                        <div className = {styles.fileChipText}>
                                            <div className={styles.fileName}>{selectedFile.name}</div>
                                            <div className={styles.fileStatus}>업로드 완료</div>
                                        </div>
                                    </FileChip>
                                ) : (
                                    // 파일이 없을 때: 안내문 렌더
                                    <span>글 등록에 필요한 사진을 업로드하세요.</span>
                                )}
                            </FileContent>
                            <HiddenFile ref={fileRef} type="file" onChange={handleFileChange} />
                            <UploadBtn type="button" onClick={handleOpenFile}>파일 업로드</UploadBtn>
                        </InputLine>
                    </InputInner>
                
                </InputContainer>
            </div>
            
            <div className = {styles.catchDate}>
                <InputContainer>
                    <InputInner>
                        <InputTitle>혼획물 포획 일시</InputTitle>
                        <InputLine>
                            <DateInputTitle/>
                            <DateInput placeholder="날짜를 선택해 주세요." />
                        </InputLine>
                    </InputInner>
                
                </InputContainer>
            </div>

        </>
    )

}

export default AnalysisArticle;