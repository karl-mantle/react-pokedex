import { cleanName, cleanNumber } from '../../utils/Cleaners.js';
import './card.css';

const ItemCard = ({ subject, setModalShow, setModalTarget }) => {

  if (!subject) {
    return null;
  }

  return (
    <>
      <div className="frame" onClick={()=>{ setModalShow(true); setModalTarget(subject.url);}}>
        <div className="card">
          <div className="details">
            <div className="id"><span>{cleanNumber(subject.id)}</span></div>
            <div>
              <div className="name"><h3>{cleanName(subject.name)}</h3></div>
              <div>
              </div>
            </div>
          </div>
          <div className="sprite"><img src={subject.sprites.default}  alt={subject.name}/></div>
        </div>
      </div>
    </>
  )
}

export default ItemCard;