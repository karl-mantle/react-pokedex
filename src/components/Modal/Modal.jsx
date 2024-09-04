import { useState } from 'react';
import Pokemon from '../Entries/Pokemon';
import Pokeball from '../../assets/svg/pokeball.svg';
import './modal.css';

const Modal = ({ setGlobalLoading, modalShow, setModalShow, modalTarget, setModalTarget, modalError, setModalError, currentView }) => {
  const [entryLoading, setEntryLoading] = useState(false);

  return (
    <div className={`modal${ !modalShow ? ' hidden' : ''}`}>
      <div className="background"></div>
      <div className="frame entry">

        { entryLoading ?  (
          <div className="loading">
            <img src={Pokeball} alt="" className="pokeball"/>
          </div>
        ) : null }

        { currentView === 'pokemon' ?  (
          <Pokemon
            setEntryLoading={setEntryLoading}
            modalTarget={modalTarget}
            setModalTarget={setModalTarget}
            setGlobalLoading={setGlobalLoading}
            modalShow={modalShow}
            setModalShow={setModalShow}
            modalError={modalError}
            setModalError={setModalError}
            entryLoading={entryLoading}
            onClose={()=> {
              setModalShow(false);
              setModalError(false);
              setModalTarget(null);
            }}
          />
        ) : null }

      </div>
    </div>
  );
};

export default Modal;