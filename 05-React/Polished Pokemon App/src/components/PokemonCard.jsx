import typeColors from "../utils/typeColors";

function PokemonCard({ name, type,type1, img, onFav, fav, onClick, toggle, isCompare, len, isInTeam, teamCount, onTeamToggle }) {

  return (
    <div className="card" onClick={onClick} style={{ backgroundColor: typeColors[type] }}>
      <img className="img" src={img} alt={name} />
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>

      <div className="type-badges">
        <span
          className="type-badge"
          style={{ backgroundColor: typeColors[type] || "#BDBDBD" }}
        >
          {type}
        </span>
        {type1 && <span
          className="type-badge"
          style={{ backgroundColor: typeColors[type1] || "#BDBDBD" }}
        >
          {type1}
        </span> }
      </div>

      <div className="card-buttons">
        <button id="fav"
          id={fav ? "fav-active" : "fav"}
          onClick={(e) => {
            e.stopPropagation();
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
          id="my-team"
          onClick={(e) => {
            e.stopPropagation();
            if (!isInTeam && teamCount >= 6) return; // prevent adding when full
            onTeamToggle();
          }}
          disabled={!isInTeam && teamCount >= 6}
          style={{
            marginTop: 20,
            border: "none",
            background: "transparent",
            padding: 0,
            cursor: !isInTeam && teamCount >= 6 ? "not-allowed" : "pointer"
          }}
        >
          <img
            id="myteamImg"
            title={isInTeam ? "Remove from Team" : "Add to Team"}
            src={isInTeam ? "/Masterball.png" : "/image.png"}
            alt={isInTeam ? "Remove from team" : "Add to team"}
          />
        </button>
      </div>
    </div>
  );
}
export default PokemonCard