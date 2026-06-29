function PokemonCard({ name, type, img, onFav, fav, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img className="img" src={img} alt={name} />
      <h3>Name: {name}</h3>
      <h3>Type: {type}</h3>
      {fav ? "💖" : "🤍"}
      <button
        id="btn"
        onClick={(e) => {
          e.stopPropagation();
          onFav();
        }}
      >Set As FAV</button>
    </div>
  );
}
export default PokemonCard