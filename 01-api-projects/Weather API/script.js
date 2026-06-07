let inp = document.getElementById("inp");
const btn = document.getElementById("btn");
let temp = document.getElementById("Temp");
let humidity = document.getElementById("Humidity");
let City = document.getElementById("City");
let Country = document.getElementById("Country");
let cond = document.getElementById("Condition");
let wind = document.getElementById("Wind");
let img = document.getElementById("img");

const weatherGradients = {
    Clear: "linear-gradient(135deg, #f6d365, #fda085)",
    Clouds: "linear-gradient(135deg, #bdc3c7, #2c3e50)",
    Rain: "linear-gradient(135deg, #4e54c8, #8f94fb)",
    Drizzle: "linear-gradient(135deg, #89f7fe, #66a6ff)",
    Thunderstorm: "linear-gradient(135deg, #232526, #414345)",
    Snow: "linear-gradient(135deg, #e6dada, #274046)",
    Mist: "linear-gradient(135deg, #757f9a, #d7dde8)",
    Haze: "linear-gradient(135deg, #3e5151, #decba4)",
    Fog: "linear-gradient(135deg, #606c88, #3f4c6b)",
    Smoke: "linear-gradient(135deg, #434343, #000000)",
    Dust: "linear-gradient(135deg, #b79891, #94716b)",
    Sand: "linear-gradient(135deg, #c2b280, #a67c52)",
    Ash: "linear-gradient(135deg, #2c3e50, #bdc3c7)",
    Squall: "linear-gradient(135deg, #141e30, #243b55)",
    Tornado: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
};

btn.addEventListener("click", async function weather() {
    try {
        let city = inp.value.toLowerCase();
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=16bd1a4ea3aaefc6222067adee493cbb&units=metric`
        );
        if (!response.ok) {
            alert("City not found");
            return;
        }

        const data = await response.json();
        console.log(data);

        renderTasks(data);
    } catch (error) {
        alert("Enter Valid Name:");
    }
});

function renderTasks(data) {
    City.textContent = data.name;
    Country.textContent = data.sys.country;
    temp.textContent = "Temperature:" + data.main.temp + " C";
    humidity.textContent = "Humidity:" + data.main.humidity + "%";
    cond.textContent = "Condition:" + data.weather[0].main;
    wind.textContent = "Wind Speed:" + data.wind.speed + "m/s";

    const bg = data.weather[0].main;

    card.style.background = weatherGradients[bg] || "linear-gradient(135deg, #1e3c72, #2a5298)";

    const icon = data.weather[0].icon;
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
}

document.addEventListener("keydown",(e)=>
{
    if(e.key==="Enter"){
        btn.click();
    }
});