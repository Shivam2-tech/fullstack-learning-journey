function YourTeam({ team, onRemove }) {

    return (
        <>
            {
                team.length === 0 ?
                    <p>No Pokémon Selected</p>
                    :
                    team.map((pokemon) => (
                        <div className="team-card" key={pokemon.name} >
                            <div
                                className="remove-team"
                                onClick={()=>onRemove(pokemon)}
                            > 
                                <img 
                                    id="myteamImg"
                                    src='/image.png' 
                                    title="Remove From Team"
                                    style={{
                                        "width":32,
                                        "height":32
                                }}></img>
                            </div>
                            <img src={pokemon.image} width="100" />
                            <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                        </div>
                    ))
            }
        </>
    )
}

export default YourTeam