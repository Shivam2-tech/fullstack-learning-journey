import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

function App() {
  const [search, setSearch] = useState("");
  const [pokemons, setPokemons] = useState([]);

  const filtered = pokemons.filter(x =>
    x.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    async function fetchPokemon() {

      // Fetch list
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      const data = await response.json();

      // Fetch details for all pokemon
      const detailedPokemon = await Promise.all(data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();

          return {
            name: details.name,
            type: details.types[0].type.name,
            image: details.sprites.other.dream_world.front_default,
            url: pokemon.url
          };
        })
      );

      setPokemons(detailedPokemon);
    }

    fetchPokemon();
  }, []);

  return (
    <>
      <h1 id='head'>Pokemons</h1>
    <div className='inp'>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>

      {filtered.length === 0 && <p>No Pokemon Found</p>}

      {filtered.map(x => (
        <PokemonCard
          key={x.url}
          name={x.name}
          type={x.type}
          img={x.image}
        />
      ))}
    </>
  );
}

export default App;