import { useNavigate } from "react-router-dom";
import GameDetails from "../pages/GameDetails";

function Gamecard({ game }) {

    const navigate = useNavigate();

    return (
        <div className="card">
            <div className="card-content" onClick={() => navigate(`/game/${game.id}`)}>
                <h3> {game.name}</h3>
                <img src={game.background_image} style={{width:250}}></img>
            </div>
        </div>
    )
}
export default Gamecard;