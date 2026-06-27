
function PokemonCard({ name, type , img}) {

    return (
        <>
            <div className="card">
                <img className="img" src={img} alt={name}></img>
                <h3>Name: {name}</h3>
                <h3>Type :{type}</h3>
            </div>
        </>
    )
}
export default PokemonCard