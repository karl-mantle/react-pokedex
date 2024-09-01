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
    <div className="sticky">
      <header>
          <div className="lights">
            <div className={`light large${ showEntry ? ' on' : '' }`}></div>
            <div className="lights">
              <div className={`light${loadingLights ? ' red' : ''}`}></div>
              <div className={`light${loadingLights ? ' yel' : ''}`}></div>
              <div className={`light${loadingLights ? ' grn' : ''}`}></div>
            </div>
          </div>

          <div className="content">
            <h1>React Pokédex</h1>
          </div>
      </header>
    </div>
  )
}

export default Header;