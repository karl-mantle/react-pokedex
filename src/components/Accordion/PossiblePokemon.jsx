import { useEffect, useState } from 'react';
import { cleanName } from '../../utils/Cleaners.js';
import Pokeball from '../../assets/svg/pokeball.svg';


const PossiblePokemon = ({ primaryData, setGlobalLoading, drawerOpen, setModalShow, setModalTarget, setModalKind }) => {
  const [ablePokemon, setAblePokemon] = useState([]);
  const [pokemonLoading, setPokemonLoading] = useState(false);

  useEffect(() => {
    const fetchAbleList = async () => {
      setGlobalLoading(true);
      setPokemonLoading(true);

      try {
        const tempAble = [];

        const fetchAblePokemon = async (url) => {
          const response = await fetch(url);
          const data = await response.json();
          tempAble.push({
            name: data.name,
            types: data.types.map(type => type.type.name),
            image: data.sprites.front_default,
            url: `https://pokeapi.co/api/v2/pokemon/${data.id}`
          });
        };
        for (const pokemon of primaryData.learned_by_pokemon) {
          await fetchAblePokemon(pokemon.url);
        }
        
        setAblePokemon(tempAble);
      }
      catch (error) {
        console.error('Error fetching Pokémon list', error);
      }
      finally {
        setGlobalLoading(false);
        setPokemonLoading(false);
      }
    };

    if (drawerOpen && primaryData) {
      fetchAbleList();
    }
  }, [primaryData, setGlobalLoading, drawerOpen]);

  return (
    <>
      <div className="able-pokemon">

        { pokemonLoading ? (
          <div className="loading medium">
            <img src={Pokeball} alt="" className="pokeball"/>
          </div>
        ) : null }

        <div className={`${pokemonLoading ? ' hidden' : ''}`}>
          {ablePokemon.map((pokemon, index) => (
            <div key={index} className="pokemon" onClick={()=>{ setModalShow(true); setModalTarget(pokemon.url); setModalKind('pokemon');}}>
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
      </div>
    </>
  );
}

export default PossiblePokemon;