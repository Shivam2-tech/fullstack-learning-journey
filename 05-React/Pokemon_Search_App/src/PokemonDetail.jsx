import { useState, useEffect } from "react";

function PokemonDetail({ pokemon, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(pokemon.url);   // fetch details for this one Pokémon
        const data = await res.json();

        setDetails({
          name: data.name,
          type: data.types?.[0]?.type?.name || "unknown",
          image:
            data.sprites.other?.dream_world?.front_default ||
            data.sprites.front_default,
          height: data.height,
          weight: data.weight,
          abilities: data.abilities.map((a) => a.ability.name),
          stats: data.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch details", err);
        setLoading(false);
      }
    }

    if (pokemon) {
      fetchDetails();
    }
  }, [pokemon]);

  if (loading || !details) {
    return (
      <div className="modal">
        <div className="modal-content">
          <p>Loading details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <img className="img" src={details.image} alt={details.name} />
        <h3>Name: {details.name}</h3>
        <h3>Type: {details.type}</h3>
        <h3>Height: {details.height}</h3>
        <h3>Weight: {details.weight}</h3>

        <h3>Abilities:</h3>
        <ul>
          {details.abilities.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </ul>

        <h3>Stats:</h3>
        <ul>
          {details.stats.map((stat) => (
            <li key={stat.name}>
              {stat.name}: {stat.value}
            </li>
          ))}
        </ul>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default PokemonDetail;
