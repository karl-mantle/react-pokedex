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

const Modal = ({ setGlobalLoading, modalShow, setModalShow, modalTarget, setModalTarget, modalError, setModalError, modalKind}) => {
  const [entryLoading, setEntryLoading] = useState(false);
  const [primaryData, setPrimaryData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const SelectedEntry = entries[modalKind];
  
  useEffect ( () => {
    const fetchEntryData = async () => {
      setGlobalLoading(true);
      setEntryLoading(true);
      setModalError(false);

      try {
        if (modalKind === 'pokemon') {
          const primaryResponse = await fetch(`${modalTarget}`);
          const primaryData = await primaryResponse.json();
          const speciesResponse = await fetch(primaryData.species.url);
          const speciesData = await speciesResponse.json();
          setPrimaryData(primaryData);
          setSpeciesData(speciesData);
        }
        else {
          const primaryResponse = await fetch(`${modalTarget}`);
          const primaryData = await primaryResponse.json();
          setPrimaryData(primaryData);
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
      // scroll to top?
    }
    else {
      document.body.classList.remove('lock');
    }

  }, [modalShow, modalTarget, setGlobalLoading, setModalError, setEntryLoading, modalKind]);

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

        { !entryLoading && SelectedEntry && (
          <SelectedEntry
            primaryData={primaryData}
            speciesData={speciesData}
            setModalTarget={setModalTarget}
            setGlobalLoading={setGlobalLoading}
            modalShow={modalShow}
            setModalShow={setModalShow}
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