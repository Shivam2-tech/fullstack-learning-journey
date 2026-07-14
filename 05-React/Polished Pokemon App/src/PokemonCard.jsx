function PokemonCard({ name, type, img, onFav, fav, onClick, toggle, isCompare, len ,isInTeam , teamCount, onTeamToggle}) {
  // Type to color mapping
  const typeColors = {
    grass: "#4CAF50",
    fire: "#ea7a3c",
    water: "#2196F3",
    bug: "#94bc4a",
    electric: "#e5c531",
    fairy: "#e397d1",
    normal: "#BDBDBD",
    ground: "#D7CCC8",
    poison: "#9C27B0",
    fighting: "#cb5f48",
    psychic: "#f098ff",
    rock: "#78909C",
    ghost: "#6C63FF",
    dragon: "#6a7baf",
    ice: "#80DEEA",
    dark: "#736c75",
    steel: "#8bb4a4",
    flying:"#7da6de"
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
        <button
          onClick={(e)=>{
            e.stopPropagation();
            onTeamToggle();
          }}
          style={{"margin-top":20}}
          disabled={!isInTeam && teamCount>=6  }
          id="compare"> 
          {isInTeam ? "REMOVE_TEAM" : "ADD-TEAM"}
          </button>
      </div>
    </div>
  );
}
export default PokemonCard