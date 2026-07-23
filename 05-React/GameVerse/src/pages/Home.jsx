import { useEffect, useState } from "react";
import Gamecard from "../components/Gamecard";

function Home() {

    const [game, setGames] = useState([]);
    const [loading, setLoading] = useState();

    useEffect(() => {
        async function fetchGame() {

            try {
                const res = await fetch(`https://api.rawg.io/api/games?key=38dc8fd962664c0ca5924db49a096ff5`);
                const data = await res.json();
                console.log(data);
                setGames(data.results);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchGame();
    }, []);

    if (loading) {
        return <h2>Loading....</h2>
    }

    return (
        <div className="game-grid">
            {
                game.map((x) => (
                    <Gamecard key={x.id} game={x} />
                ))
            }
        </div>
    )
}
export default Home;