import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

function App() {
  const [search, setSearch] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropDown, setDropDown] = useState("all");
  const [error, seterror] = useState("");
  const [favorite, setFav] = useState(false);

  const filtered = pokemons.filter(x =>
    x.name.toLowerCase().includes(search.toLowerCase())
  )        // Filters Pokemon According to Search Input 

  const typed = filtered.filter(x => {
    if (dropDown === "all") {
      return true;
    }
    return dropDown === x.type
  }
  )       //Filters Array based on User Selected Type from Dropdown Menu

  function fav(url) {
    const favs = pokemons.map(x => {
      if (x.url === url) {
        return {
          ...x,
          favourite: !x.favourite
        };
      }
      return x;
    })
    setPokemons(favs);
  }       // Converts 💖 -->  🤍 and ViceVersa

  const loved = typed.filter(x => x.favourite) // Filters Only those Pokemons who are marked as Favourites

  let count=loved.length;

  useEffect(() => {       //Data Fetching from Pokemon API once The code Runs
    async function fetchPokemon() {
      try {
        // Fetch list 
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
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
            url: pokemon.url,
            favourite: false
          };
        })
        );

        setPokemons(detailedPokemon);
        setLoading(false);
      } catch (error) {
        seterror("Loading failed")
      }
      finally {
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

        <label>
          Show favourites only
          <input
            type="checkbox"
            checked={favorite}
            onChange={(e) => setFav(e.target.checked)}
          />
        </label>
        <h3>{count}</h3>
      </div>

      {error && <h2>{error}</h2>}
      {!loading && filtered.length === 0 && <p>No Pokemon Found</p>}
      {loading && <h2>Loading.......</h2>}

      {(favorite ? loved : typed).map(x => (
        <PokemonCard
          key={x.url}
          name={x.name}
          type={x.type}
          img={x.image}
          onFav={() => fav(x.url)}
          fav={x.favourite}
        />
      ))}

    </div>
  );
}

export default App;