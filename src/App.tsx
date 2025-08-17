import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from './pages/Landing'
import Main from './pages/Home'
import FisherLogin  from "./pages/FisherLogin";

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<Main />} />
          <Route path="/fisherLogin" element={<FisherLogin />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
