import { useState } from "react";

function Player(props) {
  return (
    <div>
      <p>
        Score of {props.name} (Age: {props.age}) who lives in {props.city}:{" "}
        {props.score}
      </p>

      <button onClick={props.increase}>+1</button>
      <button onClick={props.decrease}>-1</button>
      <button onClick={props.reset}>RESET</button>

      <hr />
    </div>
  );
}

function App() {
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "Shivam",
      age: 18,
      city: "Dharashiv",
      score: 0,
    },
    {
      id: 2,
      name: "Shiv",
      age: 22,
      city: "Pune",
      score: 0,
    },
    {
      id: 3,
      name: "Tony Stark",
      age: 45,
      city: "Malibu",
      score: 0,
    },
  ]);

  function increaseScore(id) {
    const updatedPlayers = players.map((player) => {
      if (player.id === id) {
        return {
          ...player,
          score: player.score + 1,
        };
      }

      return player;
    });

    setPlayers(updatedPlayers);
  }

  function decreaseScore(id) {
    const updatedPlayers = players.map((player) => {
      if (player.id === id) {
        return {
          ...player,
          score: player.score - 1,
        };
      }

      return player;
    });

    setPlayers(updatedPlayers);
  }

  function resetScore(id) {
    const updatedPlayers = players.map((player) => {
      if (player.id === id) {
        return {
          ...player,
          score: 0,
        };
      }

      return player;
    });

    setPlayers(updatedPlayers);
  }

  function resetAll() {
    const updatedPlayers = players.map((player) => {
      return {
        ...player,
        score: 0,
      };
    });

    setPlayers(updatedPlayers);
  }

  const total = players.reduce(
    (sum, player) => sum + player.score,
    0
  );

  return (
    <div>
      <h1>Score Keeper</h1>

      {players.map((player) => (
        <Player
          key={player.id}
          name={player.name}
          age={player.age}
          city={player.city}
          score={player.score}
          increase={() => increaseScore(player.id)}
          decrease={() => decreaseScore(player.id)}
          reset={() => resetScore(player.id)}
        />
      ))}

      <h2>Total Score: {total}</h2>

      <button onClick={resetAll}>RESET ALL</button>
    </div>
  );
}

export default App;