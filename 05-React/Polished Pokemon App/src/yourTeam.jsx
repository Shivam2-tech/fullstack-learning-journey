function YourTeam({ team, onRemove }) {

    return (
        <>
            <h2>Your Team ({team.length}/6)</h2>
            {
                team.length === 0 ?
                    <p>No Pokémon Selected</p>
                    :
                    team.map((pokemon) => (
                        <div className="team-card" key={pokemon.name} >
                            <img src={pokemon.image} width="100"/>
                            <p>{pokemon.name}</p>
                        </div>
                    ))
            }
        </>
    )
}

export default YourTeam