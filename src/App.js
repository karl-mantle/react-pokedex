import React from 'react';
import Search from './components/Search';
import Pokedex from './components/Pokedex';
import './App.css';

function App() {

  return (
  <>
    <div className="container">
      <h1>React Pokédex</h1>
      <Search/>
      <Pokedex/>
    </div>
  </>
  );
}

export default App;
