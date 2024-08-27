import React, { useState, useCallback } from 'react';
import Pokedex from './components/Pokedex';
import Header from './components/Header';
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
      <Header stateLoading={stateLoading} setStateLoading={setStateLoading}/>
      <Pokedex stateLoading={stateLoading} setStateLoading={callSetStateLoading}/>
    </div>
  </>
  );
}

export default App;
