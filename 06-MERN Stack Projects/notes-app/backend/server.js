const cors = require("cors");
const express=require("express");
const app = express();
const route=require("./routes/notes")
const {DBConnect}=require("./config/db");

app.use(cors());
app.use(express.json());
DBConnect();
app.use("/notes",route);

const PORT=process.env.PORT || 3000;
app.listen(PORT,"0.0.0.0", () => {
    console.log("Server Started Running on : localhost:3000")
})