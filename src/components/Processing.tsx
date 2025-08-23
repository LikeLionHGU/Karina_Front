import styles from '../styles/process.module.css';
import fishImg from "../assets/icons/fish.png";
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

export default function Processing() {
    return (
        <>
        <section className={styles.main}>
            <div className = {styles.iconAndText}>
                <Icon src={fishImg} alt="카메라"/>
                <h1>혼획물 <Highlight>분석</Highlight> 중</h1>
            </div>
           
        </section>
        </>
    )
}