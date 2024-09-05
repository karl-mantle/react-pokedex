import { cleanName, cleanNumber } from '../../utils/Cleaners.js';
import './card.css';

const ItemCard = ({ subject, setModalShow, setModalTarget }) => {

  if (!subject) {
    return null;
  }

  return (
    <>
      <div className="frame" onClick={()=>{ setModalShow(true); setModalTarget(subject.url);}}>
        <div className="card" style={{padding: 1 + 'rem'}}>
          <div className="name" style={{margin: 0}}><h3>{cleanName(subject.name)}</h3></div>
          <div className="sprite"><img src={subject.sprites.default}  alt={subject.name}/></div>
        </div>
      </div>
    </>
  )
}

export default ItemCard;