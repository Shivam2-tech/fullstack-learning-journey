function YourTeam({ team, onRemove }) {

    return (
        <>
            {
                team.length === 0 ?
                    <p>No Pokémon Selected</p>
                    :
                    team.map((pokemon) => (
                        <div className="team-card" key={pokemon.name} >
                            <img src={pokemon.image} width="100"/>
                            <p>{pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}</p>
                        </div>
                    ))
            }
        </>
    )
}

export default YourTeam