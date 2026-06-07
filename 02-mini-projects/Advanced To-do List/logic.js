let array = [];

function add() {

    const ip = document.getElementById("inp");
    let dp = document.getElementById("s").value;

    if(ip.value === ""){
        return;
    }

    array.push({
        text: ip.value,
        priority: dp
    });

    document.getElementById("a1").innerHTML = "";
    document.getElementById("a2").innerHTML = "";

    for(let i = 0; i < array.length; i++){

        if(array[i].priority === "high"){
            document.getElementById("a1").innerHTML +=`<div>${array[i].text}</div>`;
        }

        if(array[i].priority === "low"){
            document.getElementById("a2").innerHTML +=
            `<div>${array[i].text}</div>`;
        }
    }

    ip.value = "";
}