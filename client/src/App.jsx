
import './App.css';
import Navbar from './Components/Navbar';
import Landing from './Components/landing';
import Status from './Components/StatusBar';
import Login from './Components/login';
import Register from './Components/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>
        < Navbar />
        {/* <Loading /> */}
          <div className="main">
            <Landing />
            <Status />
          </div></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
