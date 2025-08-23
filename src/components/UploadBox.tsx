// pages/VideoAnalysisPage.tsx
import styles from '../styles/UploadBox.module.css';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { useState} from "react";

type UploadBoxProps = {
  handleSelect: (file: File) => void;
};

const AnalyzeButton = styled.button`
  margin: 20px auto 133px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 235px;
  height: 66px;
  border-radius: 10px;
  background: var(--Primary-2, #0966ff);
  color: #fff;
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 600;
  cursor: pointer;
  border: 0;

  &:hover:enabled {
    transition: all 0.3s ease;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(9, 102, 255, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
const FileIcon = styled(FontAwesomeIcon)`
  color: var(--Secondary-5, #899EBB);
  font-size: 60px;
  vertical-align: middle;  /* 텍스트와 수직 정렬시 유용 */
`
const FileChip = styled.div`
  /* 부모 flex의 남는 공간을 차지하지 않게 */
  flex: 0 0 auto;

  /* 내용 크기만큼 너비로 */
  display: inline-flex;       /* block 대신 inline-flex */
  width: fit-content;         /* 또는 width: max-content; */
  white-space: nowrap;        /* 줄바꿈 방지 (이쁘게 유지) */

  align-items: center;
  gap: 11px;
  padding: 8px 12px;          /* 필요 시 칩 여백 */
  border-radius: 8px;

`
function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="69" height="69" viewBox="0 0 69 69" fill="none">
      <circle cx="34.5" cy="34.5" r="34.5" fill="#B7D3F9"/>
      <path d="M35 15L52.3205 35.25H17.6795L35 15Z" fill="#F4F8FE"/>
      <rect x="29" y="33" width="12" height="19" fill="#F4F8FE"/>
    </svg>
  );
}

export default function UploadBox({ handleSelect }: UploadBoxProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  return (
    <>
    <div className = {styles.main}>
      {/* label 안에 input을 넣으면 레이블 클릭 시 파일 선택창이 열립니다. */}
      <label className={styles.preview}>
        <input
          type="file"
          className={styles.file}
          accept="video/*"  // 영상만
          onClick={(e) => { (e.currentTarget as HTMLInputElement).value = ''; }}
          onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
        />
        {selectedFile === null? 
         <>
           <DownloadIcon />
           <div className = {styles.fileBeforeText}>
              <p className={styles.previewMsg}>파일을 선택하거나</p>
              <p className={styles.previewMsg}>여기로 끌어다 놓으세요</p>
           </div>
           
         </> : (
                // 파일이 선택됐을 때: 파일칩 렌더
                <FileChip>
                  <FileIcon icon={faFilm} /> 
                  <div className = {styles.fileChipText}>
                    <div className={styles.fileName}>{selectedFile.name}</div>
                    <div className={styles.fileStatus}>업로드 완료</div>
                  </div>
                  
                </FileChip>
              )
         }
        
      </label>

      <AnalyzeButton
        type="button"
        onClick={() => selectedFile && handleSelect(selectedFile)}
        disabled={!selectedFile}                   // 파일 없으면 비활성화
      >
        분석하기
      </AnalyzeButton>
    </div>
      
    </>
  );
}
