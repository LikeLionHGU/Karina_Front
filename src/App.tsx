import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Mypage from "./pages/Mypage";
import EditPost from "./pages/EditPost";
import UpdateProfile from "./pages/UpdateProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";
import FisherLogin  from "./pages/FisherLogin";
import FactoryLogin from "./pages/FactoryLogin";

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
            <Route path="/home" element={<Home />} />
            <Route path="/fisherLogin" element={<FisherLogin />} />
            <Route path="/FactoryLogin" element={<FactoryLogin />} />
            <Route path="/detail/:fishId" element={<Detail />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage/posts" element={<EditPost />} />
            <Route path="/mypage/profile" element={<UpdateProfile />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
