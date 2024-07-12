import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../assets/Imagologo_motion.svg';
import backgroundImage from '../assets/Telefono-01.png';
import rightArrow from '../assets/Flecha derecha.png';

function Home() {
  const navigate = useNavigate();

  const handleGoToCars = () => {
    navigate('/cars');
  };

  return (
    <div className="home-container">
      <header>
        <img src={logo} alt="Logo" className="imagologo" />
      </header>
      <main>
        <h1 className="bienvenido-a">BIENVENIDO A</h1>
        <h2 className="monitoring-innovation">MONITORING INNOVATION</h2>
        <img src={backgroundImage} alt="Background" className="background-image" />
        <div className="home-links">
          <a href="https://monitoringinnovation.com/">MONITORINGINNOVATION</a>
          <a href="https://gpscontrol.co/">GPS CONTROL</a>
          <a href="https://github.com/juanjosetrujillocardozo/frontend">Link repo front</a>
          <a href="https://github.com/juanjosetrujillocardozo/backend">Link repo back</a>
        </div>
      </main>
      <div className="navigation-arrow right-arrow" onClick={handleGoToCars}>
        <img src={rightArrow} alt="" />
      </div>
    </div>
  );
}

export default Home;
