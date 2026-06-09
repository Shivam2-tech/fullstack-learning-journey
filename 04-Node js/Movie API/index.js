const express = require("express");
const movies = require("./data/movies");
const route=require("./routes/movies");
const app = express();
const middle=require("./middleware/logger");

app.use(express.json());
app.use(middle);
app.use("/data/movies",route);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});