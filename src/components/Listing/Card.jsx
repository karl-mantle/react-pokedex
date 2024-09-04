import { cleanName, cleanNumber } from '../../utils/Cleaners.js';
import './card.css';
import '../types.css';

const Card = ({ subject, setModalShow, setModalTarget }) => {

  const types = subject.types.map(type => type.type.name);

  return (
    <>
      <div className="frame" onClick={()=>{ setModalShow(true); setModalTarget(subject.url);}}>
        <div className="card">
          <div className="details">
            <div className="id"><span>{cleanNumber(subject.id)}</span></div>
            <div>
              <div className="name"><h3>{cleanName(subject.name)}</h3></div>
              <div className="types">{types.map((type, index) => (
                <span key={index} className={`type ${type}`}>{type.toUpperCase()}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="sprite"><img src={subject.sprites.front_default}  alt={subject.name}/></div>
        </div>
      </div>
    </>
  )
}

export default Card;