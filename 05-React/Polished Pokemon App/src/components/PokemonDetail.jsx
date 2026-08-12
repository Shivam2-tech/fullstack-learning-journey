import { useState, useEffect } from "react";
import EvolutionModal from "./EvolutionModal";
import TypeModal from "./TypeModal";
import typeColors from "../utils/typeColors";

function PokemonDetail({ pokemon, onClose }) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEvolve, setShowEvolve] = useState(false);
    const [showType, setShowType] = useState(false);
    const [showShiny, setShowShiny] = useState(false);

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
                        data.sprites.other["official-artwork"].front_default,
                    shiny: data.sprites.other["official-artwork"].front_shiny,
                    height: data.height,
                    weight: data.weight,
                    abilities: data.abilities.map((a) => a.ability.name),
                    stats: data.stats.map((s) => ({
                        name: s.stat.name,
                        value: s.base_stat,
                    }))
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

    // showEvolution(Bulbasaur, [])
    // │
    // ├─ arr = ["Bulbasaur"]
    // │
    // └─ showEvolution(Ivysaur, arr)
    //        │
    //        ├─ arr = ["Bulbasaur", "Ivysaur"]
    //        │
    //        └─ showEvolution(Venusaur, arr)
    //               │
    //               ├─ arr = ["Bulbasaur", "Ivysaur", "Venusaur"]
    //               │
    //               └─ stop

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
            <div className="modal-content" style={{ backgroundColor: typeColors[details.type] }}>
                <div id="pokesquare">
                    <div id="pokedet">
                        <h4>Name: {details.name.charAt(0).toUpperCase() + details.name.slice(1)}</h4>
                        <h4>Type: {details.type.charAt(0).toUpperCase() + details.type.slice(1)}</h4>
                        <h4>Height: {details.height}</h4>
                        <h4>Weight: {details.weight}</h4>
                        <h4>Abilities:</h4>
                        <ol>
                            {details.abilities.map((ability) => (
                                <li key={ability}>{ability}</li>
                            ))}
                        </ol>
                        <h5
                            className="type-effective"
                            onClick={() => setShowType(true)}
                            style={{ "backgroundColor": typeColors[details.type] }}>
                            TYPE EFFECTIVENESS
                        </h5>
                        {showType && (
                            <TypeModal
                                pokemon={pokemon}
                                onClose={() => setShowType(false)}
                                type={details.type}
                            />
                        )}
                    </div>

                    <img
                        className="detail-img"
                        src={showShiny ? details.shiny : details.image}
                        alt={details.name} />

                </div>

                <div className="stats-container">
                    {details.stats.map((stat) => (
                        <div key={stat.name} className="stat">
                            <div>
                                {stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}: {stat.value}
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

                {/* <h3>Evolution Chain</h3>
                {evolve.map((x,i)=>{
                    return  <p>
                                {x}
                                {i!==evolve.length-1 && "🔻"}
                            </p>
                })} */}
                <button id="clsbtn" onClick={() => setShowEvolve(!showEvolve)}>
                    {showEvolve ? "HIDE EVOLUTION" : "SHOW EVOLUTION"}
                </button>

                {showEvolve && (
                    <EvolutionModal pokemon={pokemon} onClose={() => setShowEvolve(false)} img={details.image} />
                )}
                <button id="clsbtn" onClick={onClose}>Close</button>
                <button className="shiny-btn" onClick={() => setShowShiny(!showShiny)}>SHINY</button>

            </div>
        </div>
    );
}

export default PokemonDetail;
