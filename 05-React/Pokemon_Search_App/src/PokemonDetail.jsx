import { useState, useEffect } from "react";

function PokemonDetail({ pokemon, onClose }) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const colors = {
        hp: "green",
        attack: "red",
        defense: "blue",
        speed: "yellow",
        "special-attack": "orange",
        "special-defense": "purple"
    }    // We can Also Use Switch-Case if we want and can also wrap this object in a function 
 
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
                <div className="stats-container">
                    {details.stats.map((stat) => (
                        <div key={stat.name} className="stat">
                            <div>
                                {stat.name}: {stat.value}
                            </div>



                            <div className="stat-bar">
                                <div
                                    className="stat-fill"
                                    style={{
                                        width: `${Math.min(stat.value, 100)}%`,
                                        backgroundColor: colors[stat.name] || "gray"
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default PokemonDetail;
