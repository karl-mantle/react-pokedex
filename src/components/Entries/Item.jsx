import { cleanName } from '../../utils/Cleaners.js';
import './entries.css';

const Item = ({ primaryData, entryLoading, onClose }) => {

  if (!primaryData) {
    return null;
  }

  const effect = primaryData.effect_entries && primaryData.effect_entries.length > 0 ? primaryData.effect_entries[0].effect : 'No effect available';

  return (
    <div className={`details${ entryLoading ? ' hidden' : ''}`}>
      <div className="top-row">
        <div className="id"></div>
        <div className="name"><h2>{cleanName(primaryData.name)}</h2></div>
        <div className="close" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      
      <div className="fact-file">
        <div className="sprite"><img src={primaryData.sprites.default} alt={primaryData.name}/></div>
        <ul>
          <li><strong>Placeholder content.</strong></li>
        </ul>
      </div>

      <div className="message-box">
        <p>{effect}</p>
      </div>

    </div>
  );
};

export default Item;