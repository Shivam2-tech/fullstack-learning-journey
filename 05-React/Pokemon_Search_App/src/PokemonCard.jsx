
function PokemonCard({ name, type , img , onFav,fav}) {

    return (
        <>
            <div className="card">
                <img className="img" src={img} alt={name}></img>
                <h3>Name: {name}</h3>
                <h3>Type :{type}</h3>
                {fav?"💖":"🤍"}
                <button id="btn" onClick={onFav}>Set As FAV</button>
            </div>
        </>
    )
}
export default PokemonCard