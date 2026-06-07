let inp=document.getElementById("inp");

let btn=document.getElementById("btn");
let name=document.getElementById("name");
let yr=document.getElementById("year");
let img=document.getElementById("img");
let imdb=document.getElementById("imdb");
let plot=document.getElementById("plot");

btn.addEventListener("click",async function test(){

    let movie=inp.value.toLowerCase();
    const response= await fetch(`https://www.omdbapi.com/?t=${movie}&apikey=c8d7b1a2`);
   

    const data= await response.json();

    name.textContent=data.Title;
    yr.textContent="-("+data.Year+")";

    let poster=data.Poster;
   // console.log(poster);
    img.src=poster;

    imdb.textContent="IMDB: "+data.imdbRating+"⭐";
    plot.textContent=data.Plot;
});

document.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        btn.click();
    }
});