//To-DO App
import "./index.css";
import { useState } from "react";

function Show({ task, Del, mark ,completed}) {
  return (
    <>
      <ul>
        <li>{task}  
          <button onClick={Del}>DELETE</button> 
          <button onClick={mark}>Mark As Completed</button>
          {completed?"✅":"❌"}
        </li>
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
  function mark(id) {
    const marked=todos.map(x => {
      if (x.id === id) {
        return {
          ...x, completed: !x.completed
        }
      };
      return x;
    }
)
settodos(marked) 
  }

  return (
    <>
      <h1 className="head">To-Do List</h1>

      <input className="input" type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>

      <button className="btn" onClick={() => {
        const updated = [
          ...todos,
          {
            id: Date.now(),
            task: input,
            completed:false
          }
        ];
        settodos(updated);
      }
      }>ADD </button>
      {
        (todos.length === 0) ? <h3>No To Dos Yet</h3> : <h3>You have ToDos</h3>
      }
      {
        (todos.length > 0) && <h3>Total todos:{todos.length}</h3>
      }
      {todos.map(x => (
        <Show key={x.id} Del={() => Delete(x.id)} task={x.task} mark={()=>mark(x.id)} completed={x.completed}/>
      ))}

    </>

  )
}

export default App