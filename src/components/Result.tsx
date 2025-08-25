import styled from "styled-components";
import styles from '../styles/Result.module.css'
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

type AnalysisMap = Record<string, number>;
type ResultProps = {
  articleData: string | null;                // ← number → string으로
  data:  AnalysisMap | null | undefined;
  onReset: () => void | Promise<void>;
};
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
  width: min(1024px, 90vw);
  margin: 100px auto;
`;

const Card = styled.div`
  background: #f4f8fe;
  border: 1px solid #e6eefc;
  border-radius: 16px;
  padding: 36px 28px;
  text-align: center;
`;

const FishName = styled.h3`
  color: #0966ff;
  font-size: clamp(18px, 2.2vw, 24px);
  font-weight: 700;
  margin: 0 0 14px;
`;

const Count = styled.p`
  color: #7f7f7f;
  font-size: clamp(14px, 1.6vw, 18px);
  margin: 0;
`;

const Buttons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin: 50px 0 100px;
`;

const GhostButton = styled.button.attrs({ type: "button" })`
  height: 40px;
  padding: 0 20px;
  border-radius: 10px;
  border: 2px solid #0966ff;
  background: #fff;
  color: #0966ff;
  font-weight: 600;
  cursor: pointer;
`;


const PrimaryButton = styled.button`
  height: 40px;
  padding: 0 24px;
  border-radius: 10px;
  border: 0;
  background: #0966ff;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`;

const formatCount = (n: number) => `약 ${n}마리`;

export default function Result({ articleData, data, onReset, isLoading }: ResultProps & { isLoading?: boolean }) {
  const navigate = useNavigate();
  const entries = Object.entries(data ?? {})

  const top3 = entries.sort((a, b) => b[1] - a[1]).slice(0, 3);
  const handleResetClick = () => {
    onReset();
  };
  return (
    <>
    <section className={styles.title}>
        <div className={styles.inner}>
          <div className={styles.text}>
            <p>혼획물 AI 분석이 완료되었어요 !</p>
          </div>
          <div className={styles.underLine} />
        </div>
      </section>
    <section>
      {isLoading && <LoadingSpinner />}
      <Grid>
        {top3.map(([name, count]) => (
          <Card key={name}>
            <FishName>{name}</FishName>
            <Count>{formatCount(count)}</Count>
          </Card>
        ))}
        {top3.length === 0 && (
          <Card>
            <FishName>결과 없음</FishName>
            <Count>재분석을 시도해 주세요</Count>
          </Card>
        )}
      </Grid>
      <Buttons>
        <GhostButton onClick={handleResetClick}>다시 분석하기</GhostButton>
        <PrimaryButton
          onClick={() => navigate(`/article/${articleData}`)}
          disabled={articleData === null}
        >
          다음
        </PrimaryButton>
      </Buttons>
    </section>
    </>
    
  );
}
