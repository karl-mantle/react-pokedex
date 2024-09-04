import { cleanName, cleanNumber } from '../../utils/Cleaners.js';
import './card.css';
import '../types.css';

const MoveCard = ({ subject, setModalShow, setModalTarget }) => {

  return (
    <>
      <div className="frame" onClick={()=>{ setModalShow(true); setModalTarget(subject.url);}}>
        <div className="card">
          <div className="details">
            <div className="id"><span>{cleanNumber(subject.id)}</span></div>
            <div>
              <div className="name"><h3>{cleanName(subject.name)}</h3></div>
              <div className="types">
              </div>
            </div>
          </div>
          <div className="sprite"><img src={subject.sprites.front_default}  alt={subject.name}/></div>
        </div>
      </div>
    </>
  )
}

export default MoveCard;