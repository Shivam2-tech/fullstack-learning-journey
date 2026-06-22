//To-DO App

import { useState } from "react";

function Show({ task, Del }) {
  return (
    <>
      <ul>
        <li>{task}  <button onClick={Del}>DELETE</button></li>
      </ul>

    </>
  )
}
function App() {
  const [todos, settodos] = useState([]);
  const [input, setInput] = useState('');

  function Delete(id) {
    const updated = todos.filter(x => (x.id !== id))
    settodos(updated);
  }

  return (
    <>
      <h1>To-Do List</h1>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
      <button onClick={() => {
        const updated = [
          ...todos,
          {
            id: Date.now(),
            task: input
          }
        ];
        settodos(updated);
      }
      }>ADD </button>


      {todos.map(x => (
        <Show Del={() => Delete(x.id)} task={x.task} />
      ))}

    </>

  )
}

export default App