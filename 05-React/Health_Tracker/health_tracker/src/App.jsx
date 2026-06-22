import { useState } from "react";

function User({ name, age, health, increase, decrease, reset }) {

  return (
    <>
      <h3>{name} of age: {age} has a health Score of :{health}</h3>
      <button onClick={increase}>Health(+10)</button>
      <button onClick={decrease}>Health(-10)</button>
      <button onClick={reset}>Health(0)</button>
    </>

  )
}
function App() {

  const [users, SetUsers] = useState([
    { id: 1, name: "Shivam", age: 18, health: 10 },
    { id: 2, name: "Yash", age: 18, health: 10 },
    { id: 3, name: "Sushant", age: 18, health: 10 },
  ]);

  function increaseHealth(id) {
    const updatedHealth = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          health: user.health + 10
        }
      };
      return user;
    });
    SetUsers(updatedHealth);
  }

  function decreaseHealth(id) {
    const updatedHealth = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          health: user.health - 10
        }
      };
      return user;
    });
    SetUsers(updatedHealth);
  }

  function resetHealth(id) {
    const updatedHealth = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          health: 0
        }
      };
      return user;
    });
    SetUsers(updatedHealth);
  }

  function resetAll() {
    const updatedHealth = users.map((user) => {
      return {
        ...user,
        health: 0
      }
    }
    )
    SetUsers(updatedHealth);
  }

  const total = users.reduce((sum, x) => sum + x.health, 0);

  return (
    <>
      <h1> Health Tracker </h1>
      {
        users.map((x) => {
          return <User
            key={x.id}
            name={x.name}
            age={x.age}
            health={x.health}
            increase={() => increaseHealth(x.id)}
            decrease={() => decreaseHealth(x.id)}
            reset={() => resetHealth(x.id)}
          />
        })
      }
      <button onClick={resetAll}>Reset All</button>
      <h3>Total:{total}</h3>
    </>
  )
}

export default App