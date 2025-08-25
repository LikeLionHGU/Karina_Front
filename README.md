# 혼획물을 기회로 바꾸는 지속가능한 연결, **잡어드림** 🥇  

<img width="100%" alt="메인 이미지" src="https://github.com/user-attachments/assets/3f9c7f04-4e42-4c1b-96d6-1ea1bc326878" />

- **배포 URL** : [https://jabeodream.netlify.app/](https://jabeodream.netlify.app/)  

---

## 📌 프로젝트 소개  

잡어드림은 **어민이 잡은 혼획물**을 영상으로 업로드하면 Vision AI가 어종과 수량을 자동 분류합니다. 
분류된 정보는 게시물로 전환되어 기업·연구소가 실시간으로 열람할 수 있습니다.
필요 어종을 확인한 기업은 즉시 **혼획물 입찰·매칭**을 진행할 수 있으며, 어민은 간편하게 거래를 성사시킬 수 있습니다.  
공장은 안정적으로 원료를 확보하고, 어민은 새로운 수익을 창출할 수 있으며, 결과적으로 **혼획물은 효율적으로 자원화될 수 있도록 하는 ESG 지향 서비스** 입니다. 

---

## 📆 프로젝트 기간  

2025.07.21 ~ 2025.08.24  

---

## 👥 팀원 구성  

| 기획자 | 디자이너 | 프론트엔드 개발자 | 프론트엔드 개발자 | 백엔드 개발자 | 백엔드 개발자 |
| :----: | :------: | :---------------: | :---------------: | :-----------: | :-----------: |
| 오하경 | 김애현 | 박서연 | 김원진 | 강병찬 | 장세혁 |

### 🔗 프론트엔드 개발자 깃허브  

| 박서연 | 김원진 |
| :----: | :----: |
| [<img width="120" height="120" alt="Image" src="https://github.com/user-attachments/assets/6906d4c8-bf33-4782-9273-3138f8818de8" /><br/>@SeoyeonPark](https://github.com/yean1234) | [<img src="https://github.com/user-attachments/assets/284797d5-5923-44cb-832d-9e8e39e15cb2" height=120 width=120><br/>@WonjinKim](https://github.com/lingard09) |

---

## ⚙️ 개발 환경  

- **Frontend** : React, TypeScript, styled-components, HTML/CSS  
- **Build Tool** : Vite  
- **협업 툴** : GitHub, GitHub Issues, Notion, Discord  
- **배포 환경** : Netlify  

---

## 🚀 서비스 핵심 기능 및 페이지  

### 1. AI 영상 분석  
| ![영상분석](https://github.com/user-attachments/assets/84d88a64-70f7-4756-98f3-93ca46147345) | ![영상분석2](https://github.com/user-attachments/assets/47b4fc70-579f-411e-a9c7-763cf525a681) |  
| --- | --- |  
- 혼획물 영상을 업로드하면 AI가 **어종 판별 및 개체 수 분석**을 자동으로 수행합니다.  

---

### 2. 생산·가공 데이터 연계  
| ![데이터연계](https://github.com/user-attachments/assets/b4677142-039d-4400-8bfc-25c61586c726) |  
| --- |  
- 어민의 AI 분석 데이터를 **공장·연구소에 실시간 전달**합니다.  
- 이를 기반으로 가공 계획 수립과 연구 분석이 가능합니다.  

---

### 3. 품질 관리 및 이력 추적  
| ![품질관리](https://github.com/user-attachments/assets/13c9a442-388b-46dc-b7d5-0e7d13607112) |  
| --- |  
- **대기 → 매칭 대기 → 매칭 완료** 단계별 데이터를 기록합니다.  
- 투명한 이력 관리로 **소비자 신뢰 확보** 및 **수출 경쟁력 강화**에 기여합니다.  

---

### 4. 맞춤형 대시보드  
| ![대시보드1](https://github.com/user-attachments/assets/be0b992d-c48e-422b-8b61-18029bae2b51) | ![대시보드2](https://github.com/user-attachments/assets/c2b55599-6b34-42f1-800a-fc4dd0ff85c6) |  
| --- | --- |  
- **어민** : 다른 어민들의 정보, 게시글 등록일, 진행 현황 확인  
- **공장/연구소** : 어민 정보, 어획량, 마감일시 등 종합 데이터 확인  
- 사용자 그룹별로 **최적화된 UI** 제공  

---

## 📑 개발 가이드라인  

### 이슈 작성 규칙  

- Issue 제목 : `[타입] - 설명` (예: `[Style] - 텍스트 스타일 추가`)  
- Assignees : 담당자 지정  
- Labels : 작업 유형 태그  
- 본문 : 작업 상세 내용, 참고 이슈/자료 기재  

### 브랜치 규칙  

- 개인 브랜치에서만 작업  
- 브랜치 네이밍 : `#이슈번호/파트/이름` (예: `seoyeon_feat/#35)  

### 커밋 메시지 규칙  

| type     | Description                 | Example |
| -------- | --------------------------- | ------- |
| feat     | 새로운 기능 추가             | feat : 로그인 기능 구현 |
| fix      | 버그 수정                   | fix : Color 버그 수정 |
| style    | UI 스타일 변경              | style : 폰트 등록 |
| refactor | 코드 리팩토링               | refactor : 변수명 수정 |
| docs     | 문서 작업                   | docs : README 작성 |
| chore    | 기타 변경                   | chore : 파일 경로 수정 |

---
 
## 📂 프로젝트 구조

```

src
 ┣ assets
 ┃ ┣ fonts
 ┃ ┃ ┗ PretendardTTF
 ┃ ┣ icons
 ┃ ┃ ┣ 어민
 ┃ ┃ ┃ ┣ Ellipse 28.svg
 ┃ ┃ ┃ ┣ Ellipse 31.svg
 ┃ ┃ ┣ Analyze.svg
 ┃ ┃ ┣ Camera.svg
 ┃ ┃ ┣ CheckLine.png
 ┃ ┃ ┣ Edit_active.svg
 ┃ ┃ ┣ Edit_inactive.svg
 ┃ ┃ ┣ fish.png
 ┃ ┃ ┣ Graph_active.svg
 ┃ ┃ ┣ Graph_inactive.svg
 ┃ ┃ ┣ line.svg
 ┃ ┃ ┣ LocationIcon.svg
 ┃ ┃ ┣ Puzzle_active.svg
 ┃ ┃ ┣ Puzzle_inactive.svg
 ┃ ┃ ┣ restart.png
 ┃ ┃ ┗ SearchIcon.svg
 ┃ ┣ profile
 ┃ ┃ ┣ default.jpg
 ┃ ┃ ┗ profile_default.svg
 ┃ ┗ logo.svg
 ┣ components
 ┃ ┣ AcceptModal.tsx
 ┃ ┣ CancelModal.tsx
 ┃ ┣ ConfirmModal.tsx
 ┃ ┣ EditModal.tsx
 ┃ ┣ ErrorModal.tsx
 ┃ ┣ FishModal.tsx
 ┃ ┣ Footer.tsx
 ┃ ┣ Header.tsx
 ┃ ┣ LeftSidebar.tsx
 ┃ ┣ LoadingSpinner.tsx
 ┃ ┣ LogoutModal.tsx
 ┃ ┣ MenuCard.tsx
 ┃ ┣ Processing.tsx
 ┃ ┣ Restart.tsx
 ┃ ┣ Result.tsx
 ┃ ┣ SuccessModal.tsx
 ┃ ┗ UploadBox.tsx
 ┣ pages
 ┃ ┣ AnalysisArticle.tsx
 ┃ ┣ ArticleEnd.tsx
 ┃ ┣ Detail.tsx
 ┃ ┣ EditPost.tsx
 ┃ ┣ FactoryHome.tsx
 ┃ ┣ FisherHome.tsx
 ┃ ┣ Landing.tsx
 ┃ ┣ Login.tsx
 ┃ ┣ Matching.tsx
 ┃ ┣ Request.tsx
 ┃ ┣ Signup.tsx
 ┃ ┣ UpdateProfile.tsx
 ┃ ┗ VideoAnalysisPage.tsx
 ┣ styles
 ┃ ┣ AnalysisArticle.module.css
 ┃ ┣ articleEnd.module.css
 ┃ ┣ landing.module.css
 ┃ ┣ Login.module.css
 ┃ ┣ process.module.css
 ┃ ┣ Result.module.css
 ┃ ┣ SignUp.module.css
 ┃ ┗ UploadBox.module.css
 ┣ utils
 ┃ ┣ logout.ts
 ┃ ┗ token.ts
 ┣ App.css
 ┣ App.tsx
 ┣ index.css
 ┣ main.tsx
 ┗ vite-env.d.ts

 ```

