import { useState } from "react";
import Pokemon from '../Entries/Pokemon';
import Pokeball from '../../assets/svg/pokeball.svg';
import './modal.css';

const Modal = ({ currentPokemon, setCurrentPokemon, setGlobalLoading, showEntry, setShowEntry, entryError, setEntryError }) => {
  const [entryLoading, setEntryLoading] = useState(false);
  const [currentType, setCurrentType] = useState('pokemon');

  return (
    <div className={`modal${ !showEntry ? ' hidden' : ''}`}>
      <div className="background"></div>
      <div className="frame entry">

        { entryLoading ?  (
          <div className="loading">
            <img src={Pokeball} alt="" className="pokeball"/>
          </div>
        ) : null }

        { currentType === 'pokemon' ?  (
          <Pokemon
            setEntryLoading={setEntryLoading}
            currentPokemon={currentPokemon}
            setCurrentPokemon={setCurrentPokemon}
            setGlobalLoading={setGlobalLoading}
            showEntry={showEntry}
            setShowEntry={setShowEntry}
            entryError={entryError}
            setEntryError={setEntryError}
            entryLoading={entryLoading}
            onClose={()=> {
              setShowEntry(false);
              setEntryError(false);
              setCurrentPokemon(null);
            }}
          />
        ) : null }

      </div>
    </div>
  );
};

export default Modal;