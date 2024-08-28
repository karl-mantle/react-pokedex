import React, { useEffect, useState } from 'react';

const Pokedex = ( { stateLoading } ) => {
  const [loadingLights, setLoadingLights] = useState(stateLoading);

  useEffect( () => {
    if (stateLoading) {
      setLoadingLights(true);
    }
    else {
      const timer = setTimeout(() => setLoadingLights(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [stateLoading]);

  return (
    
    <div className="header-container">
      <header>
          <div className="lights">
            <div className="main-light"></div>
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

export default Pokedex;