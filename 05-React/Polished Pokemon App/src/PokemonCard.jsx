function PokemonCard({ name, type, img, onFav, fav, onClick, toggle, isCompare, len }) {
  // Type to color mapping
  const typeColors = {
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
    psychic: "#f098ff",
    rock: "#78909C",
    ghost: "#6C63FF",
    dragon: "#FF6F00",
    ice: "#80DEEA",
    dark: "#424242",
    steel: "#8bb4a4"
  };

  return (
    <div className="card" onClick={onClick} style={{backgroundColor:typeColors[type]}}>
      <img className="img" src={img} alt={name} />
      <h3>{name.charAt(0).toUpperCase()+ name.slice(1)}</h3>

      <div className="type-badges">
        <span
          className="type-badge"
          style={{ backgroundColor: typeColors[type] || "#BDBDBD" }}
        >
          {type}
        </span>
      </div>

      <div className="card-buttons">
        <button id="fav"
                id={fav ? "fav-active" : "fav"} 
                onClick={(e) => {e.stopPropagation();
                                onFav();
                                }
                        } 
                title="Toggle Favorite">
                {fav ? "★" : "☆"}  FAV
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          disabled={len === 2 && !isCompare}
          id="compare"
        >
          {isCompare ? "REMOVE" : "COMPARE"}
        </button>
        {isCompare && <span style={{ textAlign: 'center', color: '#4CAF50', fontSize: '0.8rem', fontWeight: 600 }}>SELECTED ✓</span>}
      </div>
    </div>
  );
}
export default PokemonCard