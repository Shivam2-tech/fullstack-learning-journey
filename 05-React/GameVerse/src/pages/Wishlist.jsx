import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Wishlist() {

    const navigate=useNavigate();
    const [love, setLove] = useState([]);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setLove(wishlist);
    }, [])

    function removeGame(id) {
        const removed = love.filter(x => x.id !== id);
        setLove(removed);
        localStorage.setItem("wishlist", JSON.stringify(removed))
    }
    return (
        <>
            {
                love.map((x) => (
                    <div key={x.id} className="wishlist">
                        <h2>{x.name}</h2>
                        <img className="screenshots" src={x.image}></img>
                        <h3>RATING : {x.rating} ⭐</h3>
                        <button onClick={() => removeGame(x.id)}>REMOVE</button>
                    </div>
                ))
            }
            {love.length === 0 &&
                <h2>
                    ❤️ Your Wishlist is EmptyStart exploring games and save your favorites!
                    <button onClick={()=>navigate('/')}>BROWSE GAMES</button>
                </h2>
                }
        </>
    )
}
export default Wishlist;