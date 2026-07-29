import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/index.css";

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);

  function addToWishlist() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isPresent = wishlist.some((x) => x.id === game.id);

    if (!isPresent) {
      wishlist.push({
        id: game.id,
        name: game.name,
        image: game.image,
        rating: game.rating,
      });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert(`${game.name} added to wishlist!`);
    }
  }

  useEffect(() => {
    async function fetchGameDetail() {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games/${id}?key=38dc8fd962664c0ca5924db49a096ff5`
        );
        const data = await res.json();

        const scrRes = await fetch(
          `https://api.rawg.io/api/games/${id}/screenshots?key=38dc8fd962664c0ca5924db49a096ff5`
        );
        const scrData = await scrRes.json();

        setGame({
          id: data.id,
          name: data.name,
          image: data.background_image,
          description: data.description_raw, // plain text
          release: data.released,
          rating: data.rating,
          genre: data.genres || [],
          platforms: data.platforms || [],
          playtime: data.playtime,
          metacritic: data.metacritic,
          developers: data.developers || [],
          publishers: data.publishers || [],
          website: data.website,
          esrb_rating: data.esrb_rating,
        });

        setScreenshots(scrData.results || []);
      } catch (error) {
        console.error(error);
        setGame(null);
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
          <h2>{game.id}</h2>
          <h2>{game.name}</h2>
          <h3>Rating : {game.rating} ⭐</h3>
          <h3>Playtime: {game.playtime} hr.</h3>
          <h3>Metacritic: {game.metacritic}</h3>
          <div className="genre-list">
            {game.genre?.map((x) => (
              <div className="genreName" key={x.id}>
                {x.name}
              </div>
            ))}
          </div>
          <h2>{game.release}</h2>
          <h2>AVAILABLE ON:</h2>
          <div className="platforms">
            {game.platforms?.map((x) => (
              <div className="genreName" key={x.platform.id}>
                {x.platform.name}
              </div>
            ))}
          </div>
        </div>
        <button className="wishlist-btn" onClick={addToWishlist}>
          Add to wishlist
        </button>
      </div>

      <div className="description">
        <h2>About</h2>
        <p>{game.description}</p>
      </div>

      <h3>ESRB Rating : {game.esrb_rating?.name || "Not Rated"}</h3>

      <div className="game-screenshots">
        <h2 className="scr-head">Screenshots</h2>
        {screenshots.map((x) => (
          <img
            key={x.id}
            className="screenshots"
            src={x.image}
            alt="Game screenshot"
          />
        ))}
      </div>

      <div className="creators">
        <h3>Developers:</h3>
        {game.developers?.map((x) => (
          <h3 key={x.id}>{x.name}</h3>
        ))}
        <h3>Publishers:</h3>
        {game.publishers?.map((x) => (
          <h3 key={x.id}>{x.name}</h3>
        ))}
      </div>

      {game.website && (
        <a href={game.website} target="_blank" rel="noopener noreferrer">
          Official Website
        </a>
      )}
    </>
  );
}

export default GameDetails;
