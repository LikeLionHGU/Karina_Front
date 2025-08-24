import styles from '../styles/process.module.css';
import restart from "../assets/icons/restart.png";
import styled from "styled-components";

const Highlight = styled.span`
  color: var(--Primary-2, #0966ff);
`;

const Icon = styled.img`
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    display: block;

`

export default function Restart() {
    return (
        <>
        <section className={styles.main}>
            <div className = {styles.iconAndText}>
                <Icon src={restart} alt="돌아가기"/>
                <h1>혼획물 <Highlight>다시 분석</Highlight> 중</h1>
            </div>
           
        </section>
        </>
    )
}