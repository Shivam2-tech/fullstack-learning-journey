import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

function App() {
  const [search, setSearch] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropDown, setDropDown] = useState("all");
  const [error,seterror]=useState("");

  const filtered = pokemons.filter(x =>
    x.name.toLowerCase().includes(search.toLowerCase())
  );

  const typed=filtered.filter(x=>{
    if(dropDown==="all"){
      return true;
    }
    return dropDown===x.type
  }
  )
  console.log(typed); 
  useEffect(() => {
    async function fetchPokemon() {
      try{
      // Fetch list
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=200"
      );
      if (!response.ok) {
        console.log("No Response")
      }
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
      setLoading(false);
    }catch(error){
        seterror("Loading failed")
    }
    finally{
      setLoading(false)
    }
    }
  

    fetchPokemon();
  }, []);

  return (
    <div className='body'>
      <h1 id='head'>Pokemons</h1>
      <div className='inp'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setDropDown(e.target.value)}>
          <option>all</option>
          <option>grass</option>
          <option>fire</option>
          <option>water</option>
          <option>bug</option>
          <option>electric</option>
          <option>fairy</option>
          <option>normal</option>
          <option>ground</option>
          <option>poison</option>
          <option>fighting</option>
          <option>psychic</option>
          <option>rock</option>
          <option>ghost</option>
          <option>dragon</option>
          <option>ice</option>
          <option>dark</option>
        </select>
      </div>

      {error && <h2>{error}</h2>}
      {!loading && filtered.length === 0 && <p>No Pokemon Found</p>}
      {loading && <h2>Loading.......</h2>}
      {/* {filtered.map(x => (
        <PokemonCard
          key={x.url}
          name={x.name}
          type={x.type}
          img={x.image}
        />
      ))} */}
      {typed.map(x => (
        <PokemonCard
          key={x.url}
          name={x.name}
          type={x.type}
          img={x.image}
        />
      ))}

    
    </div>
  );
}

export default App;