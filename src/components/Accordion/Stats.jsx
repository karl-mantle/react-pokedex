import { cleanName } from '../../utils/Cleaners.js';

const Stats = ({ pokemonData }) => {

  const stats = pokemonData.stats ? pokemonData.stats.map(stat => ({
    name: stat.stat.name,
    value: stat.base_stat,
  })) : [];

  return (
    <div className="stats">
      <table>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, index) => (
            <tr key={index}>
              <td>{cleanName(stat.name)}</td>
              <td>{stat.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stats;