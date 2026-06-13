require("dotenv").config();
const express = require("express");
const route = require("./routes/movies");
const app = express();
const middle = require("./middleware/logger");
const error=require("./middleware/erroHandle");
const connectDB = require("./config/db");


connectDB();
app.use(express.json());
app.use(middle);

app.use("/movies", route);
app.use(error);

app.listen(process.env.PORT, () => {
    console.log("Server running on port: http://localhost:3000/");
});