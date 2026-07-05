import { useEffect, useState } from "react";

function ComparePokemon({ pokemon1, pokemon2, onClose }) {

    const [Details, setDetails] = useState(null)
    // [weight:11, stats:[{name:hp,value:12},{name:spped,value:90},{name:defense,value:13},{name:hp,value:12}]]
    const [Details2, setDetails2] = useState(null)
    // [weight:11, stats:[{name:hp,value:12},{name:spped,value:90},{name:defense,value:13},{name:hp,value:12}]]

    // if(Details.stats[0].value>Details1.stats[0].value){
    //     return (<h2>Winner:pokemon1.name</h2>)
    // }
    const colors = {
        hp: "#4CAF50",
        attack: "#F44336",
        defense: "#2196F3",
        "special-attack": "#FF9800",
        "special-defense": "#9C27B0",
        speed: "#FFEB3B",
    };

    useEffect(() => {
        async function Compare() {
            const res = await fetch(pokemon1.url);
            const skills = await res.json();

            const res1 = await fetch(pokemon2.url);
            const skills1 = await res1.json();

            setDetails({
                weight: skills.weight,
                stats: skills.stats.map((x) => ({
                    name: x.stat.name,
                    value: x.base_stat
                }))
            })
            setDetails2({
                weight: skills1.weight,
                stats: skills1.stats.map((x) => ({
                    name: x.stat.name,
                    value: x.base_stat
                }))
            })
        }
        if (pokemon1 && pokemon2) {
            Compare();
        }
    }, [pokemon1, pokemon2])


    if (!Details || !Details2) {
        return <h2>Loading...</h2>;
    }

    //Decide Stat Winner
    const statRows = Details.stats.map((x, i) => { // [{name:"hp",val1:80,val2:90,winner1:false,winner2:true},...]

        const stat2 = Details2.stats[i];

        const win1 = x.value > stat2.value;
        const win2 = x.value < stat2.value;

        return {
            name: x.name,
            val1: x.value,
            val2: stat2.value,
            winner1: win1,
            winner2: win2,
        };
    });

    //Decide Winner
    const score1 = statRows.filter(x => x.winner1).length // score1=5
    const score2 = statRows.filter(x => x.winner2).length //score2=1

    const winner = score1 > score2 ? pokemon1.name : score2 > score1 ? pokemon2.name : "Tie"

    return (
        <div className="modal">
            <div className="modal-content compare-modal">
                <h2>BATTLE STAT COMPARISON</h2>

                <div className="compare-grid">
                    <div className="compare-col">
                        <img
                            src={pokemon1.image}
                            alt={pokemon1.name}
                            className="compare-img"
                        />
                        <h3>{pokemon1.name.charAt(0).toUpperCase()+pokemon1.name.slice(1)}</h3>

                        {statRows.map((x) => (
                            <div key={x.name} className="compare-row">
                                <span className="compare-label">
                                    {x.name}
                                </span>
                                <div className="compare-track">
                                    <div
                                        className="compare-fill"
                                        style={{
                                            width: `${(x.val1 / 150) * 100}%`,
                                            backgroundColor: colors[x.name],
                                            boxShadow: x.winner1
                                                ? "0 0 12px gold"
                                                : "none",
                                        }}
                                    />
                                </div>
                                <span className="compare-value">
                                    {x.val1}
                                </span>
                            </div>
                        ))}

                        <div className="compare-score-row">
                            <span>SCORE</span>
                            <div className="compare-track score-track">
                                <div
                                    className="compare-fill"
                                    style={{
                                        width: `${(score1 / 6) * 100}%`,
                                        backgroundColor: "gold",
                                        color: "#222",
                                    }}
                                >
                                    {score1}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="compare-col">
                        <img
                            src={pokemon2.image}
                            alt={pokemon2.name}
                            className="compare-img"
                        />
                        <h3>{pokemon2.name.charAt(0).toUpperCase()+pokemon2.name.slice(1)}</h3>

                        {statRows.map((x) => (
                            <div key={x.name} className="compare-row">
                                <span className="compare-label">
                                    {x.name}
                                </span>
                                <div className="compare-track">
                                    <div
                                        className="compare-fill"
                                        style={{
                                            width: `${(x.val2 / 150) * 100}%`,
                                            backgroundColor: colors[x.name],
                                            boxShadow: x.winner2
                                                ? "0 0 12px gold"
                                                : "none",
                                        }}
                                    />
                                </div>
                                <span className="compare-value">
                                    {x.val2}
                                </span>
                            </div>
                        ))}

                        <div className="compare-score-row">
                            <span>SCORE</span>
                            <div className="compare-track score-track">
                                <div
                                    className="compare-fill"
                                    style={{
                                        width: `${(score2 / 6) * 100}%`,
                                        backgroundColor: "gold",
                                        color: "#222",
                                    }}
                                >
                                    {score2}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h2>WINNER 🏆: {winner.charAt(0).toUpperCase()+winner.slice(1)}</h2>
                <button onClick={onClose} id="CloseCompBtn">Close Comparison</button>
            </div>
        </div>
    );
}

export default ComparePokemon;