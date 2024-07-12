import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Cars from './components/Cars';
import './App.css';
import './global.css';
import './styles/animation.css';
import { motion } from 'framer-motion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsPage />} />
      </Routes>
    </Router>
  );
}

const pageVariants = {
  initial: {
    clipPath: 'circle(0% at 100% 50%)'
  },
  in: {
    clipPath: 'circle(150% at 100% 50%)',
    transition: {
      duration: 1.5
    }
  },
  out: {
    clipPath: 'circle(0% at 100% 50%)',
    transition: {
      duration: 1.5
    }
  }
};

function HomePage() {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);

  const handleNavigateToCars = () => {
    setShowOverlay(true);
    setTimeout(() => {
      navigate('/cars');
    }, 1000);
  };

  return (
    <motion.div
      className="app-container"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <motion.div className="overlay continuous-slide" />
      <section id="home" className="section home-section">
        <Home />
      </section>
      {showOverlay && <div className="overlay slide-in"></div>}
      <div className="navigation-arrow right-arrow" onClick={handleNavigateToCars}>
        <img src={require('./assets/Flecha derecha.png').default} alt="" />
      </div>
    </motion.div>
  );
}

function CarsPage() {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  const handleNavigateToHome = () => {
    setLoading(true);
    setShowOverlay(true);
    setTimeout(() => {
      navigate('/');
      setShowOverlay(false);
    }, 1000);
  };

  return (
    <motion.div
      className="app-container"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      {loading ? (
        <div className="loading-placeholder">Cargando...</div>
      ) : (
        isLoaded && (
          <section id="cars" className="section cars-section">
            <Cars />
            <div className="navigation-arrow left-arrow" onClick={handleNavigateToHome}>
              <img src={require('./assets/Flecha izquierda.png').default} alt="" />
            </div>
          </section>
        )
      )}
      {showOverlay && <div className="overlay slide-out"></div>}
    </motion.div>
  );
}

export default App;