import styles from '../styles/landing.module.css'
import { useNavigate } from "react-router-dom";



function Landing() {
  const navigate = useNavigate();

  const onFisherClick = () => {
    navigate(`/FisherLogin`);
  }

  const onFactoryClick =  () => {
    navigate(`/FactoryLogin`);
  }
  return (
    <>
    <div className = {styles.landingBody}>
      <div className={styles.landingHeader}>
        <section className = {styles.introduction}>
          <h1>
            <span className = {styles.highlight}>잡어드림</span>과 함께 버려지는 혼획물을
          </h1>
          <h1 className = {styles.highlight}>
            수익과 환경의 가치로 전환해보세요 !
          </h1>
          <p> 
            어민과 수요자를 스마트하게 매칭해주는 혼획물 유통 플랫폼
          </p>
          <div className = {styles.buttonContainer }>
            <button className = {styles.fisher} onClick = {onFisherClick}>
              <span>어민</span>
            </button>
             <button className = {styles.factory} onClick = {onFactoryClick}>
              공장/연구소
            </button>

          </div>
        </section>
        
      </div>
    </div>
      
    </>
  )
}

export default Landing;