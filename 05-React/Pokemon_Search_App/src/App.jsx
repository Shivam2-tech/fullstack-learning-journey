import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

function App() {
  const [search, setSearch] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropDown, setDropDown] = useState("all");
  const [error, setError] = useState("");
  const [favorite, setFav] = useState(false);
  const [sort, setSort] = useState("default");

  // Filter by search
  const filtered = pokemons.filter(x =>
    x.name.toLowerCase().includes(search.toLowerCase())
  );

  // Filter by type
  const typed = filtered.filter(x =>
    dropDown === "all" ? true : dropDown === x.type
  );

  // Toggle favourite
  function fav(url) {
    const favs = pokemons.map(x =>
      x.url === url ? { ...x, favourite: !x.favourite } : x
    );
    setPokemons(favs);
  }

  // Filter favourites
  const loved = typed.filter(x => x.favourite);

  // Count favourites
  const count = loved.length;

  // Decide which list to display
  const displayed = favorite ? loved : typed;

  // Sorting
  const sortedList = [...displayed]
  if (sort === "az") {
    sortedList.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sort === "za") {
    sortedList.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Save to localStorage
  useEffect(() => {
    if (pokemons.length > 0) {
      localStorage.setItem("pokemons", JSON.stringify(pokemons));
    }
  }, [pokemons]);

  // Load from localStorage or fetch
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        if (!response.ok) {
          throw new Error("No Response");
        }
        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
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
      } catch (err) {
        setError("Loading failed");
        setLoading(false);
      }
    }

    const saved = localStorage.getItem("pokemons");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        setPokemons(parsed);
        setLoading(false);
      } else {
        fetchPokemon();
      }
    } else {
      fetchPokemon();
    }
  }, []);

  return (
    <div className="body">
      <h1 id="head">Pokemons</h1>
      <div className="inp">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokémon..."
        />

        <select value={dropDown} onChange={(e) => setDropDown(e.target.value)}>
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

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Default</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>

        <h3>{count}</h3>
      </div>

      {error && <h2>{error}</h2>}
      {!loading && filtered.length === 0 && <p>No Pokemon Found</p>}
      {loading && <h2>Loading.......</h2>}

      {sortedList.map((x) => (
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
