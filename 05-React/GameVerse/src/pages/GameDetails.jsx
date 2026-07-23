import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../styles/index.css'

function GameDetails() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [screenshots,setScreenshots]=useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGameDetail() {
            try {
                const res = await fetch(
                    `https://api.rawg.io/api/games/${id}?key=38dc8fd962664c0ca5924db49a096ff5`
                );
                const data = await res.json();

                const scrRes=await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=38dc8fd962664c0ca5924db49a096ff5`)
                const scrData=await scrRes.json();

                setGame({
                    name: data.name,
                    image: data.background_image,
                    description: data.description_raw, // use description_raw for plain text
                    id: data.id,
                    release: data.released,
                    rating: data.rating,
                    genre: data.genres,
                    platforms: data.platforms
                });

                setScreenshots(
                    scrData.results
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchGameDetail();
    }, [id]);

    if (loading) return <h2>Loading...</h2>;
    if (!game) return <h2>No game found</h2>;

    return (
        <>
            <div className="Header">
                <div className="img-container">
                    <img style={{ width: 500 }} src={game.image} alt={game.name} />
                </div>
                <div className="header-content">
                    <h2>{game.name}</h2>
                    <h3>Rating : {game.rating} ⭐</h3>
                    <div className="genre-list">
                        {game.genre.map((x) => (
                            <div className="genreName" key={x.id}>
                                {x.name}
                            </div>
                        ))}
                    </div>
                    <h2>{game.release}</h2>
                    <h2>PLATFORM:</h2>
                    <div className="platforms">
                        {game.platforms.map((x) => (
                            <div className="genreName" key={x.platform.id}>
                                {x.platform.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="description">
                <h2>About</h2>
                <p>{game.description}</p>
            </div>
           
            <div className="game-screenshots"> 
                <h2 className="scr-head">Screenshots</h2>
                {
                    screenshots.map(x=>(
                     <img className="screenshots" src={x.image}></img>
                    ))
                }
            </div>


        </>
    );
}

export default GameDetails;
