let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
let inp=document.getElementById("task");
let tl=document.getElementById("taskList");

function add(){
    if(!inp.value){
        alert("Enter Input:");
        return;
    }
    tasks.push(inp.value);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    render();
    inp.value="";
    
}
function render(){
    tl.innerHTML="";
    for(let i=0;i<tasks.length;i++){
        const li=document.createElement("li");
        li.textContent=tasks[i];

        const btn=document.createElement("button");
        btn.textContent="❌";


        btn.addEventListener("click",()=>{
            tasks.splice(i,1);

            localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
            );
            
            
            render();
            inp.value="";

        });
          li.append(btn);
    tl.append(li);
    }
  

}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        add();
    }
})