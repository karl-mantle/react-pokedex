import { useEffect, useState } from 'react';
import { cleanName } from '../../utils/Cleaners.js';
import Pokeball from '../../assets/svg/pokeball.svg';

const OtherForms = ({ speciesData, setGlobalLoading, drawerOpen, setModalShow, setModalTarget, setModalKind, modalTarget }) => {
  const [otherForms, setOtherForms] = useState([]);
  const [pokemonLoading, setPokemonLoading] = useState(false);
  const [visiblePokemon, setVisiblePokemon] = useState(6);

  useEffect(() => {
    const fetchInitialPokemon = async () => {
      setGlobalLoading(true);
      setPokemonLoading(true);

      try {
        const tempOther = [];

        const fetchOtherForms = async (url) => {
          const response = await fetch(url);
          const data = await response.json();
          tempOther.push({
            name: data.name,
            types: data.types.map(type => type.type.name),
            image: data.sprites.front_default,
            url: `https://pokeapi.co/api/v2/pokemon/${data.id}`
          });
        };
        const initialPokemon = speciesData.varieties.slice(0, 6);
        for (const pokemon of initialPokemon) {
          await fetchOtherForms(pokemon.pokemon.url);
        }
        setOtherForms(tempOther);
      }
      catch (error) {
        console.error('Error fetching Pokémon list', error);
      }
      finally {
        setGlobalLoading(false);
        setPokemonLoading(false);
      }
    };

    if (drawerOpen && speciesData) {
      fetchInitialPokemon();
    }
  }, [speciesData, setGlobalLoading, drawerOpen]);

  const loadMorePokemon = async () => {
    setPokemonLoading(true);

    try {
      const tempOther = [];

      const fetchOtherForms = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        
        tempOther.push({
          name: data.name,
          types: data.types.map(type => type.type.name),
          image: data.sprites.front_default,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}`
        });
      };

      const nextPokemon = speciesData.varieties.slice(visiblePokemon, visiblePokemon + 6);
      for (const pokemon of nextPokemon) {
        await fetchOtherForms(pokemon.pokemon.url);
      }
      setOtherForms(prevPokemon => [...prevPokemon, ...tempOther]);
      setVisiblePokemon(prevVisiblePokemon => prevVisiblePokemon + 6);
    }
    catch (error) {
      console.error('Error fetching more Pokémon', error);
    }
    finally {
      setPokemonLoading(false);
    }
  };

  const filteredOtherForms = otherForms.filter(pokemon => pokemon.url !== modalTarget);

  return (
    <>
      <div className="other-forms">
        { pokemonLoading ? (
          <div className="loading medium">
            <img src={Pokeball} alt="" className="pokeball"/>
          </div>
        ) : null}

        <div className={`${pokemonLoading ? 'hidden' : ''}`}>
          { filteredOtherForms.map((pokemon, index) => (
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

          { visiblePokemon < speciesData.varieties.length ? (
            <div className={`load-more${otherForms.length === 0 ? ' hidden' : ''}`}>
              <button onClick={loadMorePokemon}>Load more</button>
            </div>
          ) : null }

          { filteredOtherForms.length < 1  ? (
            <div className="error">
              <p>There are no alternative forms of {cleanName(speciesData.name)}</p>
            </div>
          ) : null }
        </div>
      </div>
    </>
  );
}

export default OtherForms;
