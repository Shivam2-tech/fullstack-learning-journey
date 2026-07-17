import { useEffect, useState } from "react";

function TypeModal({ pokemon, onClose , type}) {
  const [damage, setDamage] = useState(null);

  const types = {
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
    flying: "#7da6de"
  };

  useEffect(() => {
    fetchType();
  }, [pokemon]);

  async function fetchType() {
    try {
      const res = await fetch(pokemon.url);
      const data = await res.json();

      const typeRes = await fetch(data.types[0].type.url);
      const typeData = await typeRes.json();

      setDamage(typeData.damage_relations);
    } catch (err) {
      console.error("Failed to fetch type effectiveness", err);
    }
  }

  function renderTypes(arr) {
    if (!arr || arr.length === 0) {
      return <p>None</p>;
    }

    return (
      <div className="damage-list">
        {arr.map(type => (
          <span
            key={type.name}
            className="type-badge"
            style={{ backgroundColor: types[type.name] }}
          >
            {type.name.toUpperCase()}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="modal" >
      <div className="modal-content" style={{"backgroundColor":types[type]}}>

        <h2>Type Effectiveness</h2>

        {damage ? (
          <>
            <div className="damage-section">
              <h3>🔥 Strong Against</h3>
              {renderTypes(damage.double_damage_to)}
            </div>

            <div className="damage-section">
              <h3>💀 Weak Against</h3>
              {renderTypes(damage.double_damage_from)}
            </div>

            <div className="damage-section">
              <h3>🛡 Resists</h3>
              {renderTypes(damage.half_damage_from)}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}

        <button id="clsbtn" onClick={onClose}>
          CLOSE
        </button>

      </div>
    </div>
  );
}

export default TypeModal;