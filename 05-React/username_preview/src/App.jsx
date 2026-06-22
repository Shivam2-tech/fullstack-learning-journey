import { useState } from "react";

function UsernamePreview() {

  const [name, setName] = useState('');

  return (
    <>
      <input className="inp" value={name} onChange={(e) => setName(e.target.value)} />
      <li>
        <ol>Hello:{name}</ol>
        <ol>Length:{name.length}</ol>
      </li>
    </>
  )
}

export default UsernamePreview