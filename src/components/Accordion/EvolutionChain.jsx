import { useEffect, useState } from 'react';
import { cleanName } from '../../utils/Cleaners.js';
import Pokeball from '../../assets/svg/pokeball.svg';


const EvolutionChain = ({ speciesData, setGlobalLoading, drawerOpen, setModalShow, setModalTarget, setModalKind }) => {
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

        const fetchEvolutionRoot = async (chain, stage = 0) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${chain.species.name}`);
          const data = await response.json();
          tempChain.push({
            name: data.name,
            types: data.types.map(type => type.type.name),
            image: data.sprites.front_default,
            url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
            isBaby: chain.is_baby,
            evolutionDetails: chain.evolution_details,
            stage: stage
          });
          for (const evolution of chain.evolves_to) {
            await fetchEvolutionRoot(evolution, stage + 1);
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

    if (drawerOpen && speciesData) {
      fetchEvolutionChain();
    }

  }, [speciesData, setGlobalLoading, drawerOpen]);
  // make this a switch and add more reasons
  const getEvolutionDetails = (details) => {
    if (details.trigger.name === 'use-item' && details.item) {
      return `using ${cleanName(details.item.name)}`;
    } else if (details.trigger.name === 'level-up') {
      if (details.min_level) {
        return `at level ${details.min_level}`;
      } else if (details.time_of_day) {
        return `at ${details.time_of_day}`;
      } else if (details.min_happiness) {
        return 'with high friendship';
      } else if (details.min_affection) {
        return 'with high affection';
      } else {
        return 'to evolve';
      }
    } else if (details.trigger.name === 'trade') {
      return 'via trade';
    } else {
      return `via ${cleanName(details.trigger.name)}`;
    }
  };
  // need to find a way to not need this without magneton having evolves from magnemite written 7 times etc...
  const getFirstEvolutionDetail = (details) => {
    for (const detail of details) {
      const reason = getEvolutionDetails(detail);
      if (reason) return reason;
    }
    return '';
  };

  const groupedEvolutionChain = evolutionChain.reduce((acc, pokemon) => {
    if (!acc[pokemon.stage]) {
      acc[pokemon.stage] = [];
    }
    acc[pokemon.stage].push(pokemon);
    return acc;
  }, {});
  // baby pokemon are technically stage--1
  const getStageName = (stage, hasBaby) => {
    if (hasBaby) {
      const labels = ['baby', 'basic', 'stage-1'];
      return labels[stage] || null;
    } else {
      const labels = ['basic', 'stage-1', 'stage-2'];
      return labels[stage] || null;
    }
  };

  const hasBaby = groupedEvolutionChain[0]?.some(pokemon => pokemon.isBaby);

  return (
    <>
      <div className="able-pokemon">

        { chainLoading ?  (
          <div className="loading medium">
            <img src={Pokeball} alt="" className="pokeball"/>
          </div>
        ) : null }

        <div className={`${chainLoading ? ' hidden' : ''}`}>
          {Object.keys(groupedEvolutionChain).map((stage, stageIndex) => (
            <div key={stageIndex} className="evolution-stage">

              <div className="stage-name">{cleanName(getStageName(stage, hasBaby))}</div>

              {groupedEvolutionChain[stage].map((pokemon, index) => (
                <div key={index}>
                  <div className={`pokemon ${getStageName(stage, hasBaby)}`} onClick={()=>{ setModalShow(true); setModalTarget(pokemon.url); setModalKind('pokemon');}}>
                    <div className="sprite"><img src={pokemon.image}  alt={pokemon.name}/></div>
                    <div className="">
                      <div className="name"><h3>{cleanName(pokemon.name)}</h3></div>
                      <div className="types">
                        {pokemon.types.map(type => (
                          <span key={type} className={`type ${type}`}>{type.toUpperCase()}</span>
                        ))}
                      </div>
                      {pokemon.evolutionDetails.length > 0 && (
                        <div className="evolution-details">
                          <span>Evolves from {cleanName(groupedEvolutionChain[stage - 1]?.[0]?.name)} {getFirstEvolutionDetail(pokemon.evolutionDetails)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {index < groupedEvolutionChain[stage].length - 1 && (
                    <div className="divider">or</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default EvolutionChain;
