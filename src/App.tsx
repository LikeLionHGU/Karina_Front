import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import FisherHome from "./pages/FisherHome";
import FactoryHome from "./pages/FactoryHome";
import Detail from "./pages/Detail";
import Request from "./pages/Request";
import EditPost from "./pages/EditPost";
import Matching from "./pages/Matching";
import UpdateProfile from "./pages/UpdateProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VideoAnalysisPage from "./pages/VideoAnalysisPage";
import ProcessTest from './components/Processing';
import AnalysisArticle from "./pages/AnalysisArticle";

import "./App.css";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home/fisher" element={<FisherHome />} />
            <Route path="/home/factory" element={<FactoryHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/detail/:fishId" element={<Detail />} />
            <Route path="/mypage/request" element={<Request />} />
            <Route path="/mypage/matching" element={<Matching />} />
            <Route path="/mypage/posts" element={<EditPost />} />
            <Route path="/mypage/profile" element={<UpdateProfile />} />
            <Route path="/post" element={<VideoAnalysisPage />} />
            <Route path="/article" element={<AnalysisArticle />} /> 
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
