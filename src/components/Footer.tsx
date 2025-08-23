import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100vw;
  background: var(--Secondary-1, #f4f8fe);
  border-top: 1px solid #f4f8fe;
  margin-top: auto;
`;

const FooterContent = styled.div`
  margin: 0 auto;
  padding: 30px 0 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

`;

const LogoIcon = styled.div`
  width: 77px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
`;

const CompanyDescription = styled.div`
  color: var(--Primary-2, #0966ff);
  text-align: center;

  /* Button 3 */
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 150% */

`;

const InfoSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 200px;

`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

const InfoLabel = styled.span`
  color: var(--Black-3, #7f7f7f);

  /* Button 3 */
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 150% */
  white-space: nowrap;

`;

const InfoValue = styled.span`
  color: var(--Black-3, #7f7f7f);

  /* Button 3 */
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 150% */
  white-space: nowrap;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection>
          <LogoIcon>
            <img src="/logo.svg" alt="Karina Logo" />
          </LogoIcon>
          <CompanyDescription>
            수산 혼획물을 활용하여
            <br />
            수익과 환경 가치로 전환해보세요!
          </CompanyDescription>
        </LogoSection>

        <InfoSection>
          <InfoGroup>
            <InfoLabel>연락처</InfoLabel>
            <InfoValue>054-964-3889</InfoValue>
          </InfoGroup>

          <InfoGroup>
            <InfoLabel>대표자명</InfoLabel>
            <InfoValue>오하경</InfoValue>
          </InfoGroup>

          <InfoGroup>
            <InfoLabel>대표 연락처</InfoLabel>
            <InfoValue>010-9543-8893</InfoValue>
          </InfoGroup>
        </InfoSection>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
