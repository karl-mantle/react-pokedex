import { cleanName, cleanEffect } from '../../utils/Cleaners.js';
import Accordion from '../Accordion/Accordion';
import MoveData from '../Accordion/MoveData';
import PossiblePokemon from '../Accordion/PossiblePokemon';
import PhysicalIcon from '../../assets/png/icon-physical.png';
import SpecialIcon from '../../assets/png/icon-special.png';
import StatusIcon from '../../assets/png/icon-status.png';
import './entries.css';

const Move = ({ primaryData, setModalTarget, setGlobalLoading, setModalShow, setModalKind, onClose }) => {

  if (!primaryData) {
    return null;
  }

  const damageType = primaryData.damage_class ? primaryData.damage_class.name : 'problem';
  const type = primaryData.type ? primaryData.type.name : '—';
  const pp = primaryData.pp ? primaryData.pp : '—';
  const power = primaryData.power ? primaryData.power : '—';
  const accuracy = primaryData.accuracy ? primaryData.accuracy + '%' : '—';

  const effectEntries = primaryData.effect_entries ? primaryData.effect_entries.filter(entry => entry.language.name === 'en') : [];
  let effectEntry = effectEntries.length > 0 ? effectEntries[0].effect : 'No effect entry available for this move.';
  
  const accordionDrawers = [
    { title: 'Move Data', component: <MoveData primaryData={primaryData}/> },
    { title: 'Pokémon that can learn this move', component: <PossiblePokemon primaryData={primaryData} setGlobalLoading={setGlobalLoading} setModalTarget={setModalTarget} setModalShow={setModalShow} setModalKind={setModalKind}/>  }
  ];

  return (
    <div className="details">

      <div className="top-row">
        <div className={`damage-type ${damageType}`}>
          { damageType === 'physical' ? (
            <img src={PhysicalIcon} alt={damageType}/>
          ) : null }
          { damageType === 'special' ? (
            <img src={SpecialIcon} alt={damageType}/>
          ) : null }
          { damageType === 'status' ? (
            <img src={StatusIcon} alt={damageType}/>
          ) : null }
        </div>
        <div className="name"><h2>{cleanName(primaryData.name)}</h2></div>
        <div className="close" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>

      <div className="message-box">
        <p>{cleanEffect(effectEntry)}</p>
      </div>
      
      <div className="fact-file move">
        <div className="tab left">
          <h4>Type</h4>
          <span className={`type ${type}`}>{type.toUpperCase()}</span>
        </div>
        <div className="tab center">
          <h4>PP</h4>
          <span className="id stat">{pp}</span>
        </div>
        <div className="tab center">
          <h4>Power</h4>
          <span className="id stat">{power}</span>
        </div>
        <div className="tab right">
          <h4>Accuracy</h4>
          <span className="id stat">{accuracy}</span>
        </div>
      </div>

      <Accordion drawers={accordionDrawers} />

    </div>
  );
};

export default Move;