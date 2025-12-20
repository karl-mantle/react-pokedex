import { cleanName, unslugifySentence } from '../../utils/Cleaners.js';
import './entries.css';

const Item = ({ primaryData, onClose }) => {

  if (!primaryData) {
    return null;
  }

  const effect = primaryData.effect_entries?.length > 0 ? primaryData.effect_entries[0].short_effect : 'No effect available';

  return (
    <div className="details">

      <div className="top-row">
        <div className="id price">{primaryData.cost}</div>
        <div className="name"><h2>{cleanName(primaryData.name)}</h2></div>
        <div className="close" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      
      <div className="fact-file item">
        <div className="sprite">
          <img height="48" width="48" src={primaryData.sprites?.default} alt={primaryData.name} />
        </div>
        <div className="item-details">
          <p><strong>{unslugifySentence(primaryData.category.name)}</strong></p>
          <p>{effect}</p>
        </div>
      </div>

      <div className="message-box">
        <h4>Item Attributes</h4>
        <ul>
          { primaryData.attributes.map((attribute, i) => (
            <li>{unslugifySentence(attribute.name)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Item;