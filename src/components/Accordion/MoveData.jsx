import { cleanMoveData, cleanMoveValues } from '../../utils/Cleaners.js';

const MoveData = ({ primaryData }) => {
  const moveData = primaryData.meta ? {
    statusEffect: primaryData.meta.ailment.name,
    statusChance: primaryData.meta.ailment_chance,
    moveType: primaryData.meta.category.name,
    critRate: primaryData.meta.crit_rate,
    drain: primaryData.meta.drain,
    flinchChance: primaryData.meta.flinch_chance,
    healing: primaryData.meta.healing,
    maxHits: primaryData.meta.max_hits,
    maxTurns: primaryData.meta.max_turns,
    minHits: primaryData.meta.min_hits,
    minTurns: primaryData.meta.min_turns,
    statChance: primaryData.meta.stat_chance
  } : {};

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(moveData).map(([key, value], index) => (
            <tr key={index}>
              <td>{cleanMoveData(key)}</td>
              <td>{value === 0 || value === null || value === 'none' ? '—' : key === 'statusChance' ? `${cleanMoveValues(value)}%` : cleanMoveValues(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoveData;