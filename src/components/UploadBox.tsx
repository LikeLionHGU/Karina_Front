import styles from '../styles/UploadBox.module.css';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";

type UploadBoxProps = {
  handleSelect: (file: File) => void;
};

const Highlight = styled.span`
  color: var(--Primary-2, #0966ff);
`;

const AnalyzeButton = styled.button`
  margin: 20px auto 133px;
  display: flex; align-items: center; justify-content: center;
  width: 235px; height: 66px; border-radius: 10px;
  background: var(--Primary-2, #0966ff); color: #fff;
  font-size: clamp(20px, 3vw, 26px); font-weight: 600;
  cursor: pointer; border: 0;

  &:hover:enabled { transition: all .3s; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(9,102,255,.3); }
  &:disabled { opacity: .6; cursor: not-allowed; }
`;

const FileIcon = styled(FontAwesomeIcon)`
  color: var(--Secondary-5, #899EBB);
  font-size: 60px;
  vertical-align: middle;
`;

const FileChip = styled.div`
  flex: 0 0 auto;
  display: inline-flex;
  width: fit-content;
  white-space: nowrap;
  align-items: center;
  gap: 11px;
  padding: 8px 12px;
  border-radius: 8px;
`;

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
  const [isActive, setActive] = useState(false);
  const dragCounter = useRef(0);

  const handleDragEnter: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault(); e.stopPropagation();
    dragCounter.current += 1;
    setActive(true);
  };

  const handleDragOver: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!isActive) setActive(true);
  };

  const handleDragLeave: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault(); e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) setActive(false);
  };

  const handleDrop: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault(); e.stopPropagation();
    setActive(false);
    dragCounter.current = 0;

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("video/")) {
      alert("영상 파일만 업로드할 수 있어요.");
      return;
    }

    setSelectedFile(file);

    e.dataTransfer.clearData();
  };

  return (
    <>
      <section className={styles.title}>
        <div className={styles.inner}>
          <div className={styles.text}>
            <p><Highlight>혼획물 AI 분석</Highlight>을 위해</p>
            <p>영상을 업로드 해주세요 !</p>
          </div>
          <div className={styles.underLine} />
        </div>
      </section>

      <div className={styles.main}>
      {/* label 자체를 drop zone 으로 */}
      <label
        className={`${styles.preview} ${isActive ? styles.active : ""}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className={styles.file}
          accept="video/*"
          onClick={(e) => { (e.currentTarget as HTMLInputElement).value = ""; }}
          onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
        />

        {selectedFile === null ? (
          <>
            <DownloadIcon />
            <div className={styles.fileBeforeText}>
              <p className={styles.previewMsg}>파일을 선택하거나</p>
              <p className={styles.previewMsg}>여기로 끌어다 놓으세요</p>
            </div>
          </>
        ) : (
          <FileChip>
            <FileIcon icon={faFilm} />
            <div className={styles.fileChipText}>
              <div className={styles.fileName}>{selectedFile.name}</div>
              <div className={styles.fileStatus}>업로드 완료</div>
            </div>
          </FileChip>
        )}
      </label>

      <AnalyzeButton
        type="button"
        onClick={() => selectedFile && handleSelect(selectedFile)}
        disabled={!selectedFile}
      >
        분석하기
      </AnalyzeButton>
    </div>
    </>
    
  );
}
