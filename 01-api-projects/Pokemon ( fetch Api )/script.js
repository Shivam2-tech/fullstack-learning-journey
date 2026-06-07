const btn = document.getElementById("search");
const btn2 = document.getElementById("random");
let inp = document.getElementById("pokemon");
let name = document.getElementById("name");
let height = document.getElementById("height");
let weight = document.getElementById("weight");
let img = document.getElementById("img");
let type = document.getElementById("type");
let no = document.getElementById("idno");

btn.addEventListener("click", async function test() {
    try {
        const pokemon = inp.value.toLowerCase();
        console.log(pokemon);
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        if (!response.ok) {
            throw new Error("Pokemon not found");
        }

        const data = await response.json();

        img.src = data.sprites.front_default;
        name.textContent =data.name;
        height.textContent = "Height: " + data.height;
        weight.textContent = "Weight: " + data.weight;

        type.textContent = "Type:  ";
        for (let i = 0; i < data.types.length; i++) {
            type.textContent += data.types[i].type.name + "  ";
        }
        const color = data.types[0].type.name;

        //BACKGROUND COLOR

        const typeGradients = {
            fire: 'linear-gradient(135deg, #f25f64, #fad0c4)',
            water: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
            grass: 'linear-gradient(135deg, #d4fc79, #96e6a1)',
            electric: 'linear-gradient(135deg, #fdebd0, #f9e79f)',
            psychic: 'linear-gradient(135deg, #f6d365, #fda085)'
        };

        card.style.background=typeGradients[color] || 'linear-gradient(135deg, #e0e0e0, #f5f5f5)';


        no.textContent = "#" + data.id;
        inp.value = "";
    } catch (error) {
        alert("Enter Valid Name");
    }
});

btn2.addEventListener("click", async function randomize() {

    const id = Math.floor(Math.random() * 1025) + 1;

    const op = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const take = await op.json();
    img.src = take.sprites.front_default;
    name.textContent = take.name;
    height.textContent = "Height: " + take.height;
    weight.textContent = "Weight: " + take.weight;
    for (let i = 0; i < take.types.length; i++) {
        if (i === 0) {
            type.textContent = "Type(s):" + take.types[i].type.name + "   ";
        } else {
            type.textContent += take.types[i].type.name + "  ";
        }
    }
    no.textContent = "#" + take.id;


    inp.value = "";

});