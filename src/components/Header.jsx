import React, { useEffect, useState } from 'react';
import '../css/header.css';

const Header = ({ globalLoading, showEntry }) => {
  const [loadingLights, setLoadingLights] = useState(globalLoading);

  useEffect( () => {
    if (globalLoading) {
      setLoadingLights(true);
    }
    else {
      const timer = setTimeout(() => setLoadingLights(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [globalLoading]);

  return (
    
    <div className="container">
      <header>
          <div className="lights">
            <div className={`main-light${ showEntry ? ' on' : '' }`}></div>
            <div className="loading-lights">
              <div className={`light${loadingLights ? ' red' : ''}`}></div>
              <div className={`light${loadingLights ? ' yel' : ''}`}></div>
              <div className={`light${loadingLights ? ' grn' : ''}`}></div>
            </div>
          </div>
      
          <div className="header-content">
              <div className="header-title">
                <h1>React Pokédex</h1>
              </div>
          </div>
      </header>
    </div>
  )
}

export default Header;