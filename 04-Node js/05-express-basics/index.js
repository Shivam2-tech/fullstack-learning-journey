const express = require("express");

const app = express();

/*Middleware (Code before we reach a section in URL)*/
app.use((req, res, next) => {
    console.log("Request received:", req.url);
    next();
});

app.use((req,res,next)=>{
    console.log(req.method,req.url);
    next();
});

/*Basic Page*/
app.get("/", (req, res) => {
    res.send("Hello from Express 🚀");  
});

/*About Page*/
app.get("/about", (req, res) => {
    res.send("This Is about page");
});

/*Basic JSON API*/
app.get("/api/user", (req, res) => {
    res.json({
        name: "Shivam",
        age: 18
    })
});

/*API with Array Data*/
app.get("/api/movies", (req, res) => {
    res.json([{
            id: 1,
            name: "Thor",
            imdb: 9
        },
        {
            id: 2,
            name: "Spiderman",
            imdb: 9
        },
        {
            id: 3,
            name: "RRR",
            imdb: 9
        }
    ])
});

app.get("/api/student", (req, res) => {
    res.json(
        {
            name: "Shivam",
            course: "Full Stack",
            progress: "Node APIs"
        }
    )
});

app.get("/api/movie/:id", (req, res) => {
    const id = req.params.id;

    const movies = [
        { id: 1, name: "Thor" },
        { id: 2, name: "Spiderman" },
        { id: 3, name: "RRR" }
    ];

    const movie = movies.find(m => m.id == id);

    res.json(movie || { message: "Movie not found" });
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});