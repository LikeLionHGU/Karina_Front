import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Mypage from "./pages/Mypage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";

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
            <Route path="/detail/:fishId" element={<Detail />} />
            <Route path="/mypage" element={<Mypage />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
