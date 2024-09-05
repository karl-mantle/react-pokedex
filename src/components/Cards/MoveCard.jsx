import { cleanName, cleanNumber } from '../../utils/Cleaners.js';
import './card.css';
import '../types.css';

const MoveCard = ({ subject, setModalShow, setModalTarget }) => {

  if (!subject) {
    return null;
  }

  const type = subject.type ? subject.type.name : 'Unknown';

  return (
    <>
      <div className="frame" onClick={()=>{ setModalShow(true); setModalTarget(subject.url);}}>
        <div className="card">
          <div className="details">
            <div>
              <div className="name"><h3>{cleanName(subject.name)}</h3></div>
              <div className="types">
                <span className={`type ${type}`}>{type.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MoveCard;