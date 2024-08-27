import React from 'react';
import Search from './Search';

const Pokedex = ( { stateLoading, setStateLoading } ) => {

  return (
    
    <header>
      <div className="hdr-container">
        <div className="hdr-lights">
          <div className="hdr-main-light">
          </div>
          <div className="hdr-loading-lights">
              <div className={`hdr-light${stateLoading ? ' red' : ''}`}></div>
              <div className={`hdr-light${stateLoading ? ' yel' : ''}`}></div>
              <div className={`hdr-light${stateLoading ? ' grn' : ''}`}></div>
          </div>
        </div>
        <div className="hdr-content">
          <h1>React Pokédex</h1>
          <div className="hdr-search">
            <Search stateLoading={stateLoading} setStateLoading={setStateLoading} />
          </div>
        </div>
      </div>

    </header>
  )
}

export default Pokedex;