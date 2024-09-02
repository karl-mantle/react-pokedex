import { useEffect, useState } from 'react';
import { cleanName } from '../utils/TextUtils';
import Pokeball from '../svg/pokeball.svg';
import '../css/chain.css';


const Evolutions = ({ speciesData, setGlobalLoading, active, setShowEntry, setCurrentPokemon }) => {
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [chainLoading, setChainLoading] = useState([]);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      setGlobalLoading(true);
      setChainLoading(true);

      try {
        const speciesDataResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionChainData = await speciesDataResponse.json();
        const chain = evolutionChainData.chain;
        const tempChain = [];

        const fetchEvolutionRoot = async (chain) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${chain.species.name}`);
          const data = await response.json();
          tempChain.push({
            name: data.name,
            types: data.types.map(type => type.type.name),
            image: data.sprites.front_default
          });
          if (chain.evolves_to.length > 0) {
            await fetchEvolutionRoot(chain.evolves_to[0]);
          }
        };

        await fetchEvolutionRoot(chain);
        setEvolutionChain(tempChain);
      }
      catch (error) {
        console.error('Error fetching evolution chain.', error);
      }
      finally {
        setGlobalLoading(false);
        setChainLoading(false);
      }
    };

    if (active === 'secondTab' && speciesData) {
      fetchEvolutionChain();
    }

  }, [speciesData, setGlobalLoading, active]);

  return (
    <>
      <div className="evolution-chain">

      { chainLoading ?  (
          <div className="loading chain">
            <img src={Pokeball} alt="" className="pokeball"/>
          </div>
        ) : null }

        {evolutionChain.map((pokemon, index) => (
          <div key={index} className="evolution" onClick={()=>{ setShowEntry(true); setCurrentPokemon(pokemon.name);}}>
            <div className="sprite"><img src={pokemon.image}  alt={pokemon.name}/></div>
            <div className="">
              <div className="name"><h3>{cleanName(pokemon.name)}</h3></div>
              <div className="types">
                {pokemon.types.map(type => (
                  <span key={type} className={`type ${type}`}>{type.toUpperCase()}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Evolutions;
