import { useEffect, useState } from 'react';
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
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const storedPokemonList = localStorage.getItem('pokemonList');
        if (storedPokemonList) {
          setPokemonList(JSON.parse(storedPokemonList));
        }
        else {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
          const data = await response.json();
          setPokemonList(data.results);
          localStorage.setItem('pokemonList', JSON.stringify(data.results));
        }
      }
      catch (error) {
        console.error('Error fetching Pokémon list', error);
      }
    };

    fetchPokemonList();
  }, []);

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
        pokemonList={pokemonList}
      />
      <Pokedex
        setCurrentPokemon={setCurrentPokemon}
        globalLoading={globalLoading}
        setGlobalLoading={setGlobalLoading}
        showEntry={showEntry}
        setShowEntry={setShowEntry}
        pokemonList={pokemonList}
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
