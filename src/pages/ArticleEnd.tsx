import styled from "styled-components";
import styles from "../styles/articleEnd.module.css";
import { Link } from "react-router-dom";
import checkLineImg from "../assets/icons/CheckLine.png";
import outCircle from "../assets/icons/어민/Ellipse 28.svg";

/* ====== Top Check Icon ====== */
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150" fill="none">
    <circle cx="75" cy="75" r="75" fill="#0966FF" />
  </svg>
);


const CheckLineImg = styled.img`
    width: 100px;
    height: 100px;
    flex-shrink: 0;
`;

const CheckWrap = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
`;

const CheckLinePos = styled(CheckLineImg)`
    position: absolute;
    top: 25px;
    left: 25px;
`;
/* ====== Stepper ====== */
const StepperWrap = styled.div`
  position: relative;
  width: 44.17vw;         /* 848px at 1920 기준 */
  max-width: 848px;
  min-width: 320px;
  margin: 140px 0 171px;  /* 위아래 여백은 필요에 맞게 */
`;
/* 뒤에 깔리는 가로 라인 */
const Track = styled.div`
  position: absolute;
  top: 30px;              /* 원의 세로 중앙(원 높이 60px 기준) */
  left: 0; right: 0;
  height: 7px;
  background: rgba(165,190,224,1);
  border-radius: 10px;
`;

const OutCircle = styled.img`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
`;

/* 원 + 텍스트를 라인 위에 배치 */
const StepsRow = styled.ul`
  position: relative;
  z-index: 1;             /* 라인 위에 보이도록 */
  margin: 0; padding: 0; list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StepItem = styled.li`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;               /* 원과 라벨 간격 */
`;

/* 기본 원(60px) */
const Dot = styled.div<{ state?: "done" | "current" | "todo" }>`
  width: 60px; height: 60px; border-radius: 50%;
  background: ${({ state }) =>
    state === "todo" ? "var(--Primary-2, #0966FF)" :
    state === "current" ? "#A5BEE0" : "#A5BEE0"};
  outline: ${({ state }) => (state === "current" ? "4px solid rgba(9,102,255,0.25)" : "none")};
`;

/* 라벨 */
const Label = styled.div<{ active?: boolean }>`
  color: ${({ active }) => (active ? "#2F83F3" : "#7C8DA8")};
  font-size: 16px;
  font-weight: 600;
`;

/* ====== 하단 링크 ====== */
const HomeText = styled(Link)`
  margin-bottom: 235px;
  display: flex; align-items: center; justify-content: center;
  color: var(--Secondary-4, #92a9c7);
  font-size: 20px; font-weight: 600;
  cursor: pointer;
`;

const STEPS = ["대기 중", "매칭 대기", "매칭 완료"];

function ArticleEnd() {
  const currentIndex = 0; 

  return (
    <div className={styles.main} style={{ position: "relative" }}>
      {/* 상단 체크 아이콘 + 체크 라인 이미지 */}
        <CheckWrap>
            <CheckIcon />
            <CheckLinePos src={checkLineImg} />
        </CheckWrap>

      <div className={styles.completeTextAndLine}>
        <p className={styles.previewMsg}>혼획물 접수가 완료되었습니다!</p>

        {/* 진행 단계 안내 */}
        <StepperWrap>
            <Track />           {/* ← 라인 다시 넣기 */}
            <StepsRow>
                {STEPS.map((label, i) => {
                const state = i === 0 ? "todo" : "done";
                return (
                    <StepItem key={label}>
                    <Dot state={state} />
                    <Label active={i === currentIndex}>{label}</Label>
                    </StepItem>
                );
                })}
            </StepsRow>
        </StepperWrap>


        <HomeText to="/home/fisher">홈 화면으로 돌아가기</HomeText>
      </div>
    </div>
  );
}
export default ArticleEnd;
