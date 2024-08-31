import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import Pokedex from './components/Pokedex';
import PokedexEntry from './components/PokedexEntry';

function App() {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [showEntry, setShowEntry] = useState(false);
  const [entryError, setEntryError] = useState(false);

  return (
  <>
    <Header
      globalLoading={globalLoading}
      showEntry={showEntry}
    />
    <main>
      <Search
        setCurrentPokemon={setCurrentPokemon}
        setShowEntry={setShowEntry}
        showEntry={showEntry}
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
  </>
  );
}

export default App;
