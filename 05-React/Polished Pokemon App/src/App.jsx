import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import PokemonDetail from './PokemonDetail';
import ComparePokemon from './ComparePokemon';
import { useTheme } from './ThemeContext';

function App() {
  const [search, setSearch] = useState(""); //SEARCHBAR
  const [pokemons, setPokemons] = useState([]);  //POKEMON DATA
  const [loading, setLoading] = useState(true);  //LOADING
  const [dropDown, setDropDown] = useState("all");  //DROPDOWN (TYPE)
  const [error, setError] = useState(""); // ERROR STATE
  const [favorite, setFav] = useState(false); // FAVOURITE STATE
  const [sort, setSort] = useState("default"); // SORTED STATE
  const [currentPage, setCurrentPage] = useState(1);  //PAGINATION PURPOSE
  const [selectedPokemon, setselectedPokemon] = useState(null);
  const [comparePokemon, setComparePokemon] = useState([]);
  const { theme, toggleTheme } = useTheme()

  const perPage = 8; // Adjusted to 12 for better grid alignment (4x3 or 3x4)

  const types={
    grass: "#4CAF50",
    fire: "#FF7043",
    water: "#2196F3",
    bug: "#9CCC65",
    electric: "#FDD835",
    fairy: "#F06292",
    normal: "#BDBDBD",
    ground: "#D7CCC8",
    poison: "#9C27B0",
    fighting: "#E64A19",
    psychic: "#BA68C8",
    rock: "#78909C",
    ghost: "#6C63FF",
    dragon: "#FF6F00",
    ice: "#80DEEA",
    dark: "#424242"
  }

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
    const AllFavList = pokemons.map(x => ({
      ...x,
      favourite: true
    }));
    setPokemons(AllFavList);
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
  }


  //Count of All pokemons to their Types
  const stats = pokemons.reduce((sum, x) => {
    sum[x.type] = (sum[x.type] || 0) + 1;
    return sum;
  }, {});

  //Sort Pokemon Type count Ascending Order
  const sortedStats = Object.entries(stats).sort((a, b) => b[1] - a[1]); // Changed to b-a for better look
  const mostCommon = sortedStats[0];
  const leastCommon = sortedStats[sortedStats.length - 1];

  //Favourite count with Reduce
  const favCount = pokemons.reduce((sum, x) => {
    if (x.favourite) {
      sum++;
    }
    return sum;
  }, 0);

  // Pagination
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedPage = sortedList.slice(start, end);

  const totalPages = Math.ceil(sortedList.length / perPage);

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ); 


  function toggleCompare(pokemon) {
    const isPresent = comparePokemon.some(x => x.url === pokemon.url);
    if (isPresent) {
      setComparePokemon(comparePokemon.filter(x => x.url !== pokemon.url));
    }
    else if (comparePokemon.length < 2) {
      setComparePokemon([...comparePokemon, pokemon]);
    }
  }

  function randomPokemon() {
    if (pokemons.length === 0) return true;
    const index = Math.floor(Math.random() * pokemons.length);
    setselectedPokemon(pokemons[index]);
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
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
        if (!response.ok) throw new Error("No Response");
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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, dropDown, favorite, sort]);

  return (
    <div className={`body ${theme}`}>
      <div className='header'>
        <img
          id="head"
          src="/Pokemon-Logo-removebg-preview.png"
          alt="Pokemon Logo"
        />
        
        <div className="search-container">
            <span className="search-icon">🔎</span>
            <input
                className='SearchBox'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find a Pokémon..."
            />
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" 
                className="pokeball-icon" 
                alt="pokeball"
            />
        </div>
      </div>

      <div className="inp">
        <select value={dropDown} onChange={(e) => setDropDown(e.target.value)}>
          <option value="all">All Types</option>
          <option id="grass">grass</option>
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
          <option>steel</option>
        </select>

        <label className="theme-checkbox" style={{color:"black"}}>
          FAVOURITES ⭐
          <input
            type="checkbox"
            checked={favorite}
            onChange={(e) => setFav(e.target.checked)}
          />
        </label>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Default Sort</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="favFirst">Favourites First</option>
        </select>

        <button className="control-btn theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        <span className="fav-badge">Favourites: {favCount}</span>
        <button className="control-btn" onClick={() => clearFav()}>Clear Favourites</button>
        <button className="control-btn" onClick={() => AllFav()}>Select All</button>
        <button className="control-btn random-btn" onClick={() => randomPokemon()}> SURPRISE ME 🎲</button>
      </div>

      {error && <h2 className="error-msg">{error}</h2>}
      {!loading && filtered.length === 0 && <p className="no-data">No Pokemon Found</p>}
      {loading && <h2 className="loading-msg">Loading.......</h2>}

      {/* NEW: WRAPPED IN GRID CONTAINER */}
      <div className="pokemon-grid">
        {paginatedPage.map((x) => {
            const isCompare = comparePokemon.some(p => p.url === x.url)
            const len = comparePokemon.length
            return (
            <PokemonCard
                key={x.url}
                name={x.name}
                type={x.type}
                img={x.image}
                onFav={() => fav(x.url)}
                fav={x.favourite}
                onClick={() => setselectedPokemon(x)}
                toggle={() => toggleCompare(x)}
                isCompare={isCompare}
                len={len}
            />
            )
        })}
      </div>

      {selectedPokemon && (
        <PokemonDetail
          pokemon={selectedPokemon}
          onClose={() => setselectedPokemon(null)}
        ></PokemonDetail>
      )}

      {comparePokemon.length > 0 && (
          <div className="compare-status">
            <h2>Comparing: {comparePokemon.map(x => x.name).join(" vs ")}</h2>
          </div>
      )}

      {comparePokemon.length === 2 && (
        <ComparePokemon 
          pokemon1={comparePokemon[0]}
          pokemon2={comparePokemon[1]}
          onClose={() => setComparePokemon([])} 
        />
      )}

      <div className="pagination">
        <div className="nav-btns">
            <button
            disabled={currentPage === 1}
            id="prev"
            onClick={() => setCurrentPage(currentPage - 1)}>Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
            id="next"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            >
            Next
            </button>
        </div>

        <div className="pagination-numbers">
          {pages.map(page => (
            <button
              id="pages"
              className={currentPage === page ? "active" : ""}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))} 
        </div>

        <div className="stats-display">
            <h3 style={{gridColumn: '1/-1', textAlign: 'center'}}>STATS BY TYPE</h3>
            {sortedStats.map(([type, x]) => (
                <div key={type} className="stat-pill" style={{backgroundColor:types[type]}}>
                    <strong>{type.toUpperCase()}</strong>: {x} ({((x / pokemons.length) * 100).toFixed(0)}%)
                </div>
            ))}
            {sortedStats.length > 0 && (
            <div className="common-stats">
                <p><strong>Most Common:</strong> {mostCommon[0]}</p>
                <p><strong>Least Common:</strong> {leastCommon[0]}</p>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;