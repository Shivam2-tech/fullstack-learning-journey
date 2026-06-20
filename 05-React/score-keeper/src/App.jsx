import {useState} from "react";

function Player(props){

  return (
    <div>
      <p>Score of {props.name} of age:{props.age} who lives in {props.city}:{props.score}</p>
      <button onClick={props.increase}>+1</button>
      <button onClick={props.decrease}>-1</button>
      <button onClick={props.reset}>RESET</button>
    </div>
  );
}
function App(){

  const [score1,setScore1]=useState(0);
  const [score2,setScore2]=useState(0);
  const [score3,setScore3]=useState(0);

  const players=[
    {name:"Shivam",age:18,city:"Dharashiv",score:score1,increase:()=>setScore1(score1+1) , decrease:()=>setScore1(score1-1), reset:()=>setScore1(0)},
    {name:"Shivam",age:18,city:"Dharashiv",score:score2,increase:()=>setScore2(score2+1) , decrease:()=>setScore2(score2-1), reset:()=>setScore2(0)},
    {name:"Shivam",age:18,city:"Dharashiv",score:score3,increase:()=>setScore3(score3+1) , decrease:()=>setScore3(score3-1), reset:()=>setScore3(0)}
  ]
  let total=score1+score2+score3;

  return (
    <div>
      <h1>Score Keeper</h1>
      {
        players.map(x=>(
         <Player name={x.name} age={x.age} city={x.city} score={x.score} increase={x.increase} decrease={x.decrease} reset={x.reset}/>
        ))
      }
      <button onClick={()=>{
        setScore1(0);
        setScore2(0);
        setScore3(0);
      }}>RESET ALL</button>
    </div>
  );
}

export default App;