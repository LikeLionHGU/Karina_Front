import { BrowserRouter, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Landing from './pages/Landing'
import Main from './pages/Home'
import FisherLogin  from "./pages/FisherLogin";
=======
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Mypage from "./pages/Mypage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";
>>>>>>> main

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
<<<<<<< HEAD
    <>
      <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<Main />} />
          <Route path="/fisherLogin" element={<FisherLogin />} />
        </Routes>
      </div>
=======
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
>>>>>>> main
    </BrowserRouter>
  );
}

export default App;
