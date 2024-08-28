import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import Pokedex from './components/Pokedex';
import PokedexEntry from './components/PokedexEntry';
import './App.css';

function App() {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [showEntry, setShowEntry] = useState(false);

  return (
  <>
    <div className="container">
      <Header
        globalLoading={globalLoading}
        showEntry={showEntry}
      />
      <main>
        <Search
          setCurrentPokemon={setCurrentPokemon}
          setShowEntry={setShowEntry}
        />
        <Pokedex
          setCurrentPokemon={setCurrentPokemon}
          globalLoading={globalLoading}
          setGlobalLoading={setGlobalLoading}
          showEntry={showEntry}
          setShowEntry={setShowEntry}
        />
        <PokedexEntry
          currentPokemon={currentPokemon}
          setCurrentPokemon={setCurrentPokemon}
          setGlobalLoading={setGlobalLoading}
          showEntry={showEntry}
          onClose={()=> {
            setShowEntry(false);
            setCurrentPokemon(null);
          }}
        />
      </main>
      <Footer/>
    </div>
  </>
  );
}

export default App;
