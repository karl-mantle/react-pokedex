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
    
    <div className="footer-container">
      <footer>
      </footer>
    </div>
  )
}

export default Pokedex;