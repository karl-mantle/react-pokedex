import React, { useState, useEffect } from 'react';
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
  const [entryError, setEntryError] = useState(false);

  useEffect(() => {
    const adjustViewportHeight = () => {
      document.body.style.height = `${window.innerHeight}px`;
    };
    adjustViewportHeight();
    window.addEventListener('resize', adjustViewportHeight);

    return () => {
      window.removeEventListener('resize', adjustViewportHeight);
    };

  }, []);

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
          entryError={entryError}
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
          entryError={entryError}
          setEntryError={setEntryError}
          onClose={()=> {
            setShowEntry(false);
            setEntryError(false);
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
