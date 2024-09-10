import { useEffect, useState } from 'react';
import { cleanName } from '../../utils/Cleaners.js';
import Pokeball from '../../assets/svg/pokeball.svg';

const PossiblePokemon = ({ primaryData, setGlobalLoading, drawerOpen, setModalShow, setModalTarget, setModalKind }) => {
  const [ablePokemon, setAblePokemon] = useState([]);
  const [pokemonLoading, setPokemonLoading] = useState(false);
  const [visiblePokemon, setVisiblePokemon] = useState(6);

  useEffect(() => {
    const fetchInitialPokemon = async () => {
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
        const initialPokemon = primaryData.learned_by_pokemon.slice(0, 6);
        for (const pokemon of initialPokemon) {
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
      fetchInitialPokemon();
    }
  }, [primaryData, setGlobalLoading, drawerOpen]);

  const loadMorePokemon = async () => {
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

      const nextPokemon = primaryData.learned_by_pokemon.slice(visiblePokemon, visiblePokemon + 6);
      for (const pokemon of nextPokemon) {
        await fetchAblePokemon(pokemon.url);
      }
      setAblePokemon(prevPokemon => [...prevPokemon, ...tempAble]);
      setVisiblePokemon(prevVisiblePokemon => prevVisiblePokemon + 6);
    }
    catch (error) {
      console.error('Error fetching more Pokémon', error);
    }
    finally {
      setPokemonLoading(false);
    }
  };

  return (
    <>
      <div className="able-pokemon">
        { pokemonLoading ? (
          <div className="loading medium">
            <img src={Pokeball} alt="" className="pokeball"/>
          </div>
        ) : null}

        <div className={`${pokemonLoading ? 'hidden' : ''}`}>
          { ablePokemon.map((pokemon, index) => (
            <div key={index} className="pokemon" onClick={() => { setModalShow(true); setModalTarget(pokemon.url); setModalKind('pokemon'); }}>
              <div className="sprite"><img src={pokemon.image} alt={pokemon.name} /></div>
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

          { visiblePokemon < primaryData.learned_by_pokemon.length ? (
            <div className={`load-more${ablePokemon.length === 0 ? ' hidden' : ''}`}>
              <button onClick={loadMorePokemon}>Load more</button>
            </div>
          ) : null }

          { ablePokemon.length === 0 ? (
            <div className="error">
              <p>Sorry, there was a problem fetching Pokémon data from PokeAPI.</p>
            </div>
          ) : null }
        </div>
      </div>
    </>
  );
}

export default PossiblePokemon;
