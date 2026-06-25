import { useState } from 'react'
import PokemonCard from './PokemonCard';

function App() {

  const [search, setSearch] = useState("");

  const pokemons = [
    { id: 1, name: "Pikachu", type: "Electric" },
    { id: 2, name: "Onix", type: "Rock" },
    { id: 3, name: "Bulbasaur", type: "Grass" },
    { id: 4, name: "Squirtle", type: "Water" },
  ]

  const filtered = pokemons.filter(x => (
    x.name.toLowerCase().includes(search.toLowerCase())
  )
  )

  return (
    <>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
      <h1>Pokemon Card</h1>

      {
        filtered.map(x => (
          <PokemonCard key={x.id} name={x.name} type={x.type} />
        )
        )
      }
    </>



  )
}
export default App
