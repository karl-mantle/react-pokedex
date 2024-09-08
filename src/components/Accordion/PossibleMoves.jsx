import { useEffect, useState } from 'react';
import { cleanName } from '../../utils/Cleaners.js';
import Pokeball from '../../assets/svg/pokeball.svg';

const PossibleMoves = ({ pokemonData, setGlobalLoading, drawerOpen, setModalShow, setModalTarget, setModalKind }) => {
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [movesLoading, setMovesLoading] = useState(false);

  useEffect(() => {
    const fetchPossibleMoves = async () => {
      setGlobalLoading(true);
      setMovesLoading(true);

      try {
        const filteredMoves = pokemonData.moves.filter(move => 
          move.version_group_details.some(detail => detail.version_group.name === 'scarlet-violet')
        );

        const tempMoves = [];

        for (const move of filteredMoves) {
          const response = await fetch(move.move.url);
          const data = await response.json();
          const scarletVioletDetail = move.version_group_details.find(detail => detail.version_group.name === 'scarlet-violet');

          tempMoves.push({
            name: data.name,
            types: data.type.name,
            url: `https://pokeapi.co/api/v2/move/${data.id}`,
            levelLearnedAt: scarletVioletDetail.level_learned_at,
            howLearned: scarletVioletDetail.move_learn_method.name
          });
        }
        setPossibleMoves(tempMoves);
      }
      catch (error) {
        console.error('Error fetching possible moves', error);
      }
      finally {
        setGlobalLoading(false);
        setMovesLoading(false);
      }
    };

    if (drawerOpen && pokemonData) {
      fetchPossibleMoves();
    }
  }, [pokemonData, setGlobalLoading, drawerOpen]);

  return (
    <>
      <div className="possible-moves">
        {movesLoading ? (
          <div className="loading medium">
            <img src={Pokeball} alt="" className="pokeball" />
          </div>
        ) : null}

        <div className={`${movesLoading ? 'hidden' : ''}`}>
          {possibleMoves.map((move, index) => (
            <div key={index} className="move" onClick={() => { setModalShow(true); setModalTarget(move.url); setModalKind('move'); }}>
                <div>
                  <div className="name"><h3>{cleanName(move.name)}</h3></div>
                  { move.howLearned === 'level-up' ? (<div>Learned at level {move.levelLearnedAt}</div>) : null}
                  { move.howLearned === 'machine' ? (<div>Learned by TM</div>) : null }
                  { move.howLearned === 'egg' ? (<div>Inherited from parent</div>) : null }
                </div>
                <div className="types">
                  <span className={`type ${move.types}`}>{move.types.toUpperCase()}</span>
                </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PossibleMoves;
