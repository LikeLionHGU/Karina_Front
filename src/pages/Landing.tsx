import styles from '../styles/landing.module.css'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import cameraImage from '../assets/icons/camera.png';
import docsImage from '../assets/icons/docs.png';
import matchImage from '../assets/icons/match.png';
import LineIcon from "../assets/icons/line.svg";
const Highlight = styled.span`
  color: var(--Primary-2, #0966FF);
`;

/*아이콘 모음*/
const Camera = styled.img`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
`

const Docs = styled.img`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
`

const Match = styled.img`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
`
/*아이콘 컨테이너 모음*/
const IconWithDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconDescriptionTitle = styled.h2`
  margin-top:25px;
  color: #FFF;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

`

const IconDescriptionDetail = styled.p`
  margin-top:30px;
  color: #FFF;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

`
const Arrow = styled.div`
  /*카메라랑 화살표 중앙정렬*/
  padding-bottom: 100px; 
  display:flex;
  align-items: center;
  margin-left: -30px;
  margin-right: 25px;
`;

const ArrowBody = styled.div`
  width: 278.5px;
  height: 0;
  flex-shrink: 0;
  border-top: 2px solid var(--White-1, #F8FBFE);
`;

const ArrowHead = styled.div`
    width: 0;
    height: 0;
    border-bottom: 5px solid transparent;
    border-top: 5px solid transparent;
    border-left: 5px solid #F8FBFE;
    border-right: 5px solid transparent;
`;

/*마지막 문단 */
const LineAndText = styled.div`
  display:flex;
  justify-content:center;
`
const GrayLine = styled.img`
  margin-left:23px;
  padding-top:5px;
  img{
    width: 225px;
    height: 20px;
    flex-shrink: 0;
  }

`

/*svg파일이 없어서 CSS코드로 대체*/
const BlueLine = styled.div`
  margin-right:20px;
  display:flex;
  align-items: center;

`
const BlueLineHead= styled.div`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  background-color: #0966FF; 
  border-radius: 50%; 
`;

const BlueLineBody = styled.div`
  width: 270px;
  height: 2px;               
  background-color: #0966FF; 
  flex-shrink: 0;
`;


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
      <div className={styles.landingBanner}>
         {/* 첫 문단*/}
        <section className = {styles.introduction}>
          <h1>
            <Highlight >잡어드림</Highlight>과 함께 버려지는 혼획물을
          </h1>
          <h1>
            <Highlight>
              수익과 환경의 가치로 전환해보세요 !
            </Highlight>
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
      {/* 두번째 문단*/}
        <section className = {styles.SecondIntroduction}>
          <p className = {styles.detail}> 
            영상 한 번, 분석은 AI가
          </p>
          <h1>
            힘든 분류 작업, 이제는 <Highlight>자동</Highlight>으로
          </h1>
          <p>
            영상 업로드만으로 <Highlight>혼획물 종류를 정확하게 분석</Highlight>합니다 !
          </p>
        </section>

        {/*파란 네모 배너*/}
        <div className = {styles.BlueContainer}>
            <div className = {styles.MainTitle}>
              <h1>이용 프로세스는</h1>
              <h1>이렇게 진행됩니다</h1>
            </div>
            <div className = {styles.ProcessContainer}>
              <IconWithDescription>
                <Camera src={cameraImage} alt="camera" />
                <IconDescriptionTitle>영상 등록</IconDescriptionTitle>
                <IconDescriptionDetail>사진/영상을 등록하세요</IconDescriptionDetail>
              </IconWithDescription>
              <Arrow>
                <ArrowBody />
                <ArrowHead />
              </Arrow>
              <IconWithDescription>
                <Docs src={docsImage} alt="docs" />
                <IconDescriptionTitle>AI 자동 분석</IconDescriptionTitle>
                <IconDescriptionDetail>AI가 종류를 분류합니다</IconDescriptionDetail>
              </IconWithDescription>
              <Arrow>
                <ArrowBody />
                <ArrowHead />
              </Arrow>
                <IconWithDescription>
                <Match src={matchImage} alt="match" />
                <IconDescriptionTitle>수요자 매칭</IconDescriptionTitle>
                <IconDescriptionDetail>필요한 수요자와 연결됩니다</IconDescriptionDetail>
              </IconWithDescription>
            </div>
        </div>

        {/*파란 배너 아래 문단*/}
        <section className = {styles.ThridIntroduction}>
          <LineAndText>
            <h1>AI가 분석해 준 정보를 등록하면</h1>
            <GrayLine src={LineIcon} alt="line" />
          </LineAndText>
          <LineAndText>
            <BlueLine>
              <BlueLineBody />
              <BlueLineHead />
            </BlueLine>
            <h1><Highlight>필요한 곳과 바로</Highlight> 연결됩니다</h1>
          </LineAndText>
        </section>

        {/*마지막 문단*/}
        <section className = {styles.LastIntroduction}>
          <p >등록된 혼획물 데이터를 기반으로</p>
          <p>필요로 하는 기업, 가게, 소비자와 연결될 수 있어요</p>
        </section>
        
    </div>
      
    </>
  )
}

export default Landing;