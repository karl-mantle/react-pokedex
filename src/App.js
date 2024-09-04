import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';
import Listing from './components/Listing/Listing';
import Modal from './components/Modal/Modal';

function App() {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [currentList, setCurrentList] = useState([]);
  const [currentView, setCurrentView] = useState('pokemon');

  const [itemList, setItemList] = useState([]);
  const [moveList, setMoveList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  
  const [modalShow, setModalShow] = useState(false);
  const [modalTarget, setModalTarget] = useState(null);
  const [modalError, setModalError] = useState(false);
  
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const localPokemonList = localStorage.getItem('pokemonList');
        const localTypeList = localStorage.getItem('typeList');
        const localMoveList = localStorage.getItem('moveList');
  
        if (localPokemonList) {
          setPokemonList(JSON.parse(localPokemonList));
          setCurrentList(JSON.parse(localPokemonList));
        }
        else {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
          const data = await response.json();
          setPokemonList(data.results);
          localStorage.setItem('pokemonList', JSON.stringify(data.results));
        }
  
        if (localTypeList) {
          setTypeList(JSON.parse(localTypeList));
        }
        else {
          const response = await fetch('https://pokeapi.co/api/v2/type?limit=19');
          const data = await response.json();
          setTypeList(data.results);
          localStorage.setItem('typeList', JSON.stringify(data.results));
        }
  
        if (localMoveList) {
          setMoveList(JSON.parse(localMoveList));
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
  
    fetchLists();
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
      
        globalLoading={globalLoading}
        setGlobalLoading={setGlobalLoading}
        currentView={currentView}
        modalShow={modalShow}
        setModalShow={setModalShow}
        setModalTarget={setModalTarget}

        currentList={currentList}
      />
      
      <Modal
        setGlobalLoading={setGlobalLoading}
        currentView={currentView}
        modalShow={modalShow}
        setModalShow={setModalShow}
        modalTarget={modalTarget}
        setModalTarget={setModalTarget}
        modalError={modalError}
        setModalError={setModalError}
      />
    </main>
    <Footer/>
  </>
  );
}

export default App;
