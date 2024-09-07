import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';
import Listing from './components/Listing/Listing';
import Modal from './components/Modal/Modal';

function App() {
  const [globalLoading, setGlobalLoading] = useState(false);

  const [pokemonList, setPokemonList] = useState([]);
  const [moveList, setMoveList] = useState([]);
  const [itemList, setItemList] = useState([]);

  const [typesList, setTypesList] = useState([]);
  const [pokedexList, setPokedexList] = useState([]);
  
  const [modalShow, setModalShow] = useState(false);
  const [modalTarget, setModalTarget] = useState(null);
  const [modalError, setModalError] = useState(false);
  const [currentKind, setCurrentKind] = useState('pokemon');
  
  useEffect(() => {
    const fetchBaseLists = async () => {
      try {
        const localPokemonList = localStorage.getItem('pokemonList');
        const localItemList = localStorage.getItem('itemList');
        const localMoveList = localStorage.getItem('moveList');
        const localTypesList = localStorage.getItem('typesList');
        const localPokedexList = localStorage.getItem('pokedexList');
  
        if (localPokemonList) {
          setPokemonList(JSON.parse(localPokemonList));
        }
        else {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100025');
          const data = await response.json();
          setPokemonList(data.results);
          localStorage.setItem('pokemonList', JSON.stringify(data.results));
        }
        
        if (localItemList) {
          setItemList(JSON.parse(localItemList));
        }
        else {
          const response = await fetch('https://pokeapi.co/api/v2/item?limit=2180');
          const data = await response.json();
          setItemList(data.results);
          localStorage.setItem('itemList', JSON.stringify(data.results));
        }
  
        if (localMoveList) {
          setMoveList(JSON.parse(localMoveList));
        }
        else {
          const response = await fetch('https://pokeapi.co/api/v2/move?limit=937');
          const data = await response.json();
          setMoveList(data.results);
          localStorage.setItem('moveList', JSON.stringify(data.results));
        }

        if (localTypesList) {
          setTypesList(JSON.parse(localTypesList));
        }
        else {
          const response = await fetch('https://pokeapi.co/api/v2/type?limit=18');
          const data = await response.json();
          setTypesList(data.results);
          localStorage.setItem('typesList', JSON.stringify(data.results));
        }

        if (localPokedexList) {
          setPokedexList(JSON.parse(localPokedexList));
        }
        else {
          const response = await fetch('https://pokeapi.co/api/v2/pokedex');
          const data = await response.json();
          setPokedexList(data.results);
          localStorage.setItem('pokedexList', JSON.stringify(data.results));
        }
      }
      catch (error) {
        console.error('Error fetching base lists:', error);
      }
    };
  
    fetchBaseLists();
  }, []);

  return (
  <>
    <Header
      globalLoading={globalLoading}
      modalShow={modalShow}
    />
    <main>
      <Search
        modalShow={modalShow}
        setModalShow={setModalShow}
        setModalTarget={setModalTarget}
        modalError={modalError}

        pokemonList={pokemonList}
      />

      <Listing
        modalShow={modalShow}
        setModalShow={setModalShow}
        setModalTarget={setModalTarget}
        
        pokemonList={pokemonList}
        typesList={typesList}
        pokedexList={pokedexList}
      />
      
      <Modal
        setGlobalLoading={setGlobalLoading}
        modalShow={modalShow}
        setModalShow={setModalShow}
        modalTarget={modalTarget}
        setModalTarget={setModalTarget}
        modalError={modalError}
        setModalError={setModalError}
        currentKind={currentKind}
        setCurrentKind={setCurrentKind}
      />
    </main>
    <Footer/>
  </>
  );
}

export default App;
