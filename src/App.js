import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';
import Listing from './components/Listing/Listing';
import Modal from './components/Modal/Modal';

function App() {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [showEntry, setShowEntry] = useState(false);
  const [entryError, setEntryError] = useState(false);

  const [pokemonList, setPokemonList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [moveList, setMoveList] = useState([]);
  
  useEffect(() => {
    const fetchPokeAPILists = async () => {
      try {
        const storedPokemonList = localStorage.getItem('pokemonList');
        const storedTypeList = localStorage.getItem('typeList');
        const storedMoveList = localStorage.getItem('moveList');
  
        if (storedPokemonList) {
          setPokemonList(JSON.parse(storedPokemonList));
        }
        else {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
          const data = await response.json();
          setPokemonList(data.results);
          localStorage.setItem('pokemonList', JSON.stringify(data.results));
        }
  
        if (storedTypeList) {
          setTypeList(JSON.parse(storedTypeList));
        }
        else {
          const response = await fetch('https://pokeapi.co/api/v2/type?limit=19');
          const data = await response.json();
          setTypeList(data.results);
          localStorage.setItem('typeList', JSON.stringify(data.results));
        }
  
        if (storedMoveList) {
          setMoveList(JSON.parse(storedMoveList));
        }
        else {
          const response = await fetch('https://pokeapi.co/api/v2/move?limit=1000');
          const data = await response.json();
          setMoveList(data.results);
          localStorage.setItem('moveList', JSON.stringify(data.results));
        }
      }
      catch (error) {
        console.error('Error fetching lists from PokeAPI', error);
      }
    };
  
    fetchPokeAPILists();
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

      <Listing
        setCurrentPokemon={setCurrentPokemon}
        globalLoading={globalLoading}
        setGlobalLoading={setGlobalLoading}
        showEntry={showEntry}
        setShowEntry={setShowEntry}
        pokemonList={pokemonList}
      />
      
      <Modal
        currentPokemon={currentPokemon}
        setCurrentPokemon={setCurrentPokemon}
        setGlobalLoading={setGlobalLoading}
        showEntry={showEntry}
        setShowEntry={setShowEntry}
        entryError={entryError}
        setEntryError={setEntryError}
      />
    </main>
    <Footer/>
  </>
  );
}

export default App;
