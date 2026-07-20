import { useEffect, useState } from "react";

function EvolutionModal({ pokemon, onClose }) {
  const [evolve, setEvolve] = useState([]);

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
    fetchEvolution();
  }, [pokemon]);

  async function fetchEvolution() {
    try {
      const result = await fetch(pokemon.url);
      const data = await result.json();

      const species = await fetch(data.species.url);
      const speciesData = await species.json();

      const evolveChain = await fetch(speciesData.evolution_chain.url);
      const evolveData = await evolveChain.json();

      const stages = await getEvolutionStages(evolveData.chain);
      setEvolve(stages);
    } catch (err) {
      console.error("Failed to fetch evolution details", err);
    }
  }

  async function getEvolutionStages(chain, arr = []) {
    // Fetch Pokémon data for this stage
    const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${chain.species.name}`);
    const pokeData = await pokeRes.json();

    arr.push({
      name: chain.species.name,
      image:
        pokeData.sprites.other?.dream_world?.front_default ||
        pokeData.sprites.other?.["official-artwork"]?.front_default ||
        pokeData.sprites.front_default ||
        "",
    });

    // Loop through ALL possible evolutions, not just the first
    for (const evo of chain.evolves_to) {
      await getEvolutionStages(evo, arr);
    }

    return arr;
  }

  return (
    <div className="modal">
      <div className="modal-content" style={{backgroundColor:types[pokemon.type]}}>
        {evolve.length > 0 && (
          <div>
            <h3>Evolution Chain</h3>

            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
              {evolve.map((stage) => (
                <div key={stage.name} style={{ textAlign: "center" }}>
                  <img
                    src={stage.image}
                    alt={stage.name}
                    style={{ width: "80px", height: "80px", objectFit: "contain" }}
                  />
                  <p>{stage.name.charAt(0).toUpperCase() + stage.name.slice(1)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <button className="shiny-btn" onClick={onClose}>CLOSE</button>
      </div>
    </div>
  );
}

export default EvolutionModal;
