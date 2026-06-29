import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

function App() {
  const [search, setSearch] = useState(""); //SEARCHBAR
  const [pokemons, setPokemons] = useState([]);  //POKEMON DATA
  const [loading, setLoading] = useState(true);  //LOADING
  const [dropDown, setDropDown] = useState("all");  //DROPDOWN (TYPE)
  const [error, setError] = useState(""); // ERROR STATE
  const [favorite, setFav] = useState(false); // FAVOURITE STATE
  const [sort, setSort] = useState("default"); // SORTED STATE
  const [currentPage, setCurrentPage] = useState(1);  //PAGINATION PURPOSE

  const perPage = 10;

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

  //Clear All Favourites Logic
  function clearFav() {
    const cleared = pokemons.map(x => ({
      ...x,
      favourite: false
    }));
    setPokemons(cleared);
  }

  function AllFav() {
    const AllFav = pokemons.map(x => ({
      ...x,
      favourite: true
    }));
    setPokemons(AllFav);
  }

  // Filter favourites
  const loved = typed.filter(x => x.favourite);

  // Count favourites
  const count = pokemons.filter(x => x.favourite).length;

  // Decide which list to display
  const displayed = favorite ? loved : typed;

  // Sorting
  let sortedList = [...displayed];
  if (sort === "az") {
    sortedList.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sort === "za") {
    sortedList.sort((a, b) => b.name.localeCompare(a.name));
  }
  if (sort === "favFirst") {
    sortedList.sort((a, b) => b.favourite - a.favourite);
  }  //logic -> -1=a before b , 0=keep as it is , 1=b before a


  //Count of All pokemons to their Types

  const stats = pokemons.reduce((sum, x) => {

    sum[x.type] = (sum[x.type] || 0) + 1;
    return sum;

  }, {});


  //Sort Pokemon Type count Ascending Order
  const sortedStats = Object.entries(stats).sort((a, b) => a[1] - b[1]);
  const mostCommon=sortedStats[sortedStats.length-1];
  const leastCommon=sortedStats[0];

  //Favourite count with Reduce

  const favCount = pokemons.reduce((sum, x) => {
    if (x.favourite) {
      sum++;
    }
    return sum;
  }, 0);

  console.log(favCount)
  // Pagination
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedPage = sortedList.slice(start, end);

  const totalPages = Math.ceil(sortedList.length / perPage);

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ); //Create An Array of Lenght-(totalPages)


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
      if (parsed.length === 100) {
        setPokemons(parsed);
        setLoading(false);
      } else {
        fetchPokemon();
      }
    } else {
      fetchPokemon();
    }
  }, []);

  // Reset to page 1 whenever search/filter/sort/favourite changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, dropDown, favorite, sort]);

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
          <option value="favFirst">Favourites First</option>
        </select>

        {/* <h3>Total Pokemons : {count}</h3> */}
        <h3>Favourties :{favCount}</h3>
        <br></br>
        <button onClick={() => clearFav()}>Clear All Favourites</button>
        <button onClick={() => AllFav()}>All Favourites</button>

      </div>

      {error && <h2>{error}</h2>}
      {!loading && filtered.length === 0 && <p>No Pokemon Found</p>}
      {loading && <h2>Loading.......</h2>}

      {paginatedPage.map((x) => (
        <PokemonCard
          key={x.url}
          name={x.name}
          type={x.type}
          img={x.image}
          onFav={() => fav(x.url)}
          fav={x.favourite}
        />
      ))}

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}>Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>


        <div className="pagination">
          {pages.map(page => (
            <button
              className={currentPage === page ? "active" : ""}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
        {
          sortedStats.map(([type, x]) => (
            <h2 key={type}>
              {type}:{x} ({((x/100)*100).toFixed(0)})%
            </h2>
          ))
        }
        <h3>Most Common Type={mostCommon[0]}-{mostCommon[1]}</h3>
        <h3>Least Common Type={leastCommon[0]}-{leastCommon[1]}</h3>
      </div>
    </div>
  );
}

export default App;