require("dotenv").config();
const error=require("./middleware/errorHandle");
const express=require("express");
const log=require("./middleware/log");
const route=require("./routes/notes");
const app=express();
const connectDB = require("./config/db");
const auth=require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use(log);
app.use("/notes",route);
app.use("/auth",auth);

app.use(error);

app.listen((3000),()=>{
    console.log("Server Running on Port http://localhost:3000");
});
