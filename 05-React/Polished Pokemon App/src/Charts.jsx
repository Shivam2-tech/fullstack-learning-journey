import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

function Charts({ pokemons, team }) {
  const typeColors = {
    grass: "#4CAF50",
    fire: "#ea7a3c",
    water: "#2196F3",
    bug: "#94bc4a",
    electric: "#e5c531",
    fairy: "#e397d1",
    normal: "#BDBDBD",
    ground: "#D7CCC8",
    poison: "#9C27B0",
    fighting: "#cb5f48",
    psychic: "#f098ff",
    rock: "#78909C",
    ghost: "#6C63FF",
    dragon: "#6a7baf",
    ice: "#80DEEA",
    dark: "#736c75",
    steel: "#8bb4a4",
    flying: "#7da6de",
  };

  // ===============================
  // Pokémon by Type (Bar Chart)
  // ===============================
  const typeStats = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.type] = (acc[pokemon.type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(typeStats).map(([type, count]) => ({
    type,
    count,
  }));

  // ===============================
  // Favourite Types (Pie Chart)
  // ===============================
  const favourites = pokemons.filter((pokemon) => pokemon.favourite);

  const favouriteStats = favourites.reduce((acc, pokemon) => {
    acc[pokemon.type] = (acc[pokemon.type] || 0) + 1;
    return acc;
  }, {});

  const favouriteChartData = Object.entries(favouriteStats).map(
    ([type, count]) => ({
      type,
      count,
    })
  );

  // ===============================
  // Team Composition (Pie Chart)
  // ===============================
  const teamStats = team.reduce((acc, pokemon) => {
    acc[pokemon.type] = (acc[pokemon.type] || 0) + 1;
    return acc;
  }, {});

  const teamChartData = Object.entries(teamStats).map(([type, count]) => ({
    type,
    count,
  }));

  return (
    <div className="charts-container">
      {/* ================= Bar Chart ================= */}
      <div className="chart-card">
        <h2>📊 Pokémon by Type</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip cursor={{ fill: "rgba(0,0,0,.05)" }} />

            <Bar
              dataKey="count"
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={typeColors[entry.type] || "gray"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= Favourite Pie Chart ================= */}
      <div className="chart-card">
        <h2>🥧 Favourite Types</h2>

        {favouriteChartData.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            No favourite Pokémon yet.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={favouriteChartData}
                dataKey="count"
                nameKey="type"
                outerRadius={120}
                label
              >
                {favouriteChartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={typeColors[entry.type] || "gray"}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ================= Team Pie Chart ================= */}
      <div className="chart-card">
        <h2>👥 Team Composition</h2>

        {teamChartData.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            Your team is empty.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={teamChartData}
                dataKey="count"
                nameKey="type"
                outerRadius={120}
                label
              >
                {teamChartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={typeColors[entry.type] || "gray"}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default Charts;