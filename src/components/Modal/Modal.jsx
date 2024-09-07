import { useState, useEffect } from 'react';
import Item from '../Entries/Item';
import Move from '../Entries/Move';
import Pokemon from '../Entries/Pokemon';
import pokeball from '../../assets/svg/pokeball.svg';
import './modal.css';

const entries = {
  item: Item,
  move: Move,
  pokemon: Pokemon
};

const Modal = ({ setGlobalLoading, modalShow, setModalShow, modalTarget, setModalTarget, modalError, setModalError }) => {
  const [entryLoading, setEntryLoading] = useState(false);
  const [primaryData, setPrimaryData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [currentKind, setCurrentKind] = useState('pokemon');
  const CurrentEntry = entries[currentKind]; /* look up why does current have to be capitalised for this to work?
  const CurrentEntry = currentKind.charAt(0).toUpperCase() + currentKind.slice(1); */  
  
  useEffect ( () => {
    const fetchEntryData = async () => {
      setGlobalLoading(true);
      setEntryLoading(true);
      setModalError(false);

      try {
        if (currentKind === 'pokemon') {
          const primaryResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${modalTarget}`);
          const primaryData = await primaryResponse.json();
          const speciesResponse = await fetch(primaryData.species.url);
          const speciesData = await speciesResponse.json();
          setPrimaryData(primaryData);
          setSpeciesData(speciesData);
        }
        else {
          const primaryResponse = await fetch(`https://pokeapi.co/api/v2/${currentKind}/${modalTarget}`);
          const pokemonData = await primaryResponse.json();
          setPrimaryData(pokemonData);
          setSpeciesData(null);
        }
      }
      catch (error) {
        console.error('Error fetching Pokémon entry.', error);
        setModalError(true);
      }
      finally {
        setEntryLoading(false);
        setGlobalLoading(false);
      }
    }

    if (modalShow) {
      fetchEntryData();
      document.body.classList.add('lock');
    }
    else {
      document.body.classList.remove('lock');
    }

  }, [modalShow, modalTarget, setGlobalLoading, setModalError, setEntryLoading, currentKind]);

  if (!modalShow || !modalTarget || !primaryData || modalError ) return null;

  return (
    <div className={`modal${ !modalShow ? ' hidden' : ''}`}>
      <div className="background"></div>
      <div className="frame entry">

        { entryLoading ? (
          <div className="loading">
            <img src={pokeball} alt="" className="pokeball"/>
          </div>
        ) : null }

        { CurrentEntry && (
          <CurrentEntry
            primaryData={primaryData}
            speciesData={speciesData}
            setModalTarget={setModalTarget}
            setGlobalLoading={setGlobalLoading}
            modalShow={modalShow}
            setModalShow={setModalShow}
            entryLoading={entryLoading}
            onClose={() => {
              setModalShow(false);
              setModalError(false);
              setModalTarget(null);
            }}
          />
        )}

      </div>
    </div>
  );
};

export default Modal;