function Dashboard({ total, fav, most, less, team }) {
    return (
        <div className="dashboard">

            <div className="dash-card" style={{"backgroundColor":'#ff4757'}}>
                <h2>{total}</h2>
                <p>Total Pokémon</p>
            </div>

            <div className="dash-card" style={{"backgroundColor":'#fbc531'}}>
                <h2>{fav}</h2>
                <p>Favorites</p>
            </div>

            <div className="dash-card" style={{"backgroundColor":'#4cd137'}}>
                <h2>{team}/6</h2>
                <p>My Team</p>
            </div>

            <div className="dash-card" style={{"backgroundColor":"#2196F3"}}>
               <h2>{(most?.[0] || "N/A").charAt(0).toUpperCase() + (most?.[0] || "").slice(1)}</h2>
                <p style={{"color":"white"}}>Most Common</p>
            </div>

            <div className="dash-card" style={{"backgroundColor": "#7da6de"}}>
                <h2>{less?.[0] || "N/A"}</h2>
                <p style={{"color":"white"}}>Least Common</p>
            </div>

        </div>
    )
}
export default Dashboard