import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'; 
import './App.css'; 
import ColorPicker from './components/ColorPicker'; 
import Colormix from './components/Colormix'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Colormix.css"
function App() {
  const navigate = useNavigate(); 
  const navigate2 = useNavigate()
  return (
    <div className="App">
      <header className="App-header">
        <button className='back' onClick={()=>navigate2('/')}>Home
        <i className="fa-solid fa-shuttle-space" space></i>
        </button>
        <h1>Hue World</h1>
        <button className='btn_color' title="Click to mix colors!" onClick={() => navigate('/Colormix')}>
          Mix
          
          <i className="fa-solid fa-droplet"></i>
        </button>
      </header>
      
      <Routes>
        <Route path="/" element={<ColorPicker />} />
        <Route path="/Colormix" element={<Colormix />} /> 
      </Routes>
      
      <ToastContainer autoClose={2000} hideProgressBar={true} /> 
    </div>
  );
}


const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
