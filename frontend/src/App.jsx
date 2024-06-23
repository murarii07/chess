
import './App.css';
import Navbar from './Components/Navbar';
import Landing from './Components/landing';
import Status from './Components/StatusBar';
function App() {
 
  return (
    <>
      <Navbar />
      <div className="main">
        {/* <Loading message="sd"/> */}
        <Landing />
        <Status />
      </div>

    </>
  );
}

export default App;
