import { useEffect, useState } from "react";
import types from "../utils/typeColors";

function EvolutionModal({ pokemon, onClose }) {
  const [evolve, setEvolve] = useState([]);

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
