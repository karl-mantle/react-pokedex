import React, { useState, useCallback } from 'react';
import Pokedex from './components/Pokedex';
import Header from './components/Header';
import Search from './components/Search';
import './App.css';

function App() {
  const [stateLoading, setStateLoading] = useState(false);

  const callSetStateLoading = useCallback((loading) => {
    setStateLoading(loading);
  }, []);

  /* add language selection here in order to pass down language to components */

  return (
  <>
    <div className="container">
      <Header stateLoading={stateLoading}/>
      <main>
        <Search stateLoading={stateLoading} setStateLoading={setStateLoading}/>
        <Pokedex stateLoading={stateLoading} setStateLoading={callSetStateLoading}/>
      </main>

    </div>
  </>
  );
}

export default App;
