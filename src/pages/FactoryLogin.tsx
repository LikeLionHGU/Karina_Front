import styles from '../styles/FactoryLogin.module.css';
import styled from "styled-components";

function FactoryLogin() {

  /*글자 및 배너를 감싸는 컴포넌트를 만들어 1:1 비율로 있도록 함*/
  /*동시에 이 컴포넌트에 폰트 CSS를 적용해 글자 컴포넌트를 따로 만들지 않음 */
  const Factory = styled.div`
    flex: 1;
    padding-left: 7px;
    color: var(--White-1, #F8FBFE);
    font-size: clamp(20px, 2vw, 30px);
    font-style: normal;
    font-weight: 600;
    line-height: 45px;
  `

  const Fisher = styled.div`
    flex: 1;
    color: #000;
    font-size: clamp(20px, 2vw, 30px);
    font-style: normal;
    font-weight: 600;
    line-height: 45px; /* 150% */
  `
  const Input = styled.input`
    width: 658px;
    height: 81px;
    flex-shrink: 0;
    border-radius: 20px;
    border: 1.5px solid var(--Secondary-3, #A5BEE0);
     /* Placeholder styles using the ::placeholder pseudo-element */
    &::placeholder {
      color: var(--Secondary-5, #899EBB);
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 30px; /* 150% */
      }

  `
  return (
    <>
      <div className = {styles.FactoryLoginHeader}>
        <h1>로그인</h1>

        <div className = {styles.LoginStatus}>
          <Factory>
            <div className = {styles.Factory}>
              공장/연구소
            </div>
          </Factory>
          <Fisher>
            <div className = {styles.Fisher}>
              어민
            </div>
          </Fisher>
        </div>
      </div>
      <section className = {styles.IdAndPassword}>
        <Input placeholder="여기에 입력" />
        <Input placeholder="여기에 입력" />
      </section>
    </>
  )
}

export default  FactoryLogin;