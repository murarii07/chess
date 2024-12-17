
import Navbar from './Components/Navbar';
import Landing from './Components/landing';
import Status from './Components/StatusBar';
import Login from './Components/login';
import Register from './Components/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './Components/Home';
function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>
          <div className="flex flex-wrap " style={{width:"100%",height:"100%"}}>
        < Navbar />
        <div className='w-full h-5/6   flex m-2 overflow-hidden flex-wrap mb-4 '>
            <Landing />
            <Status />
        </div>
          </div></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
