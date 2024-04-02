const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB

mongoose.connect("mongodb+srv://jldelott:jackson085@cluster0.d0gxsqg.mongodb.net/");


// API Creation

app.get("/",(req,res)=>{
    res.send("Experess App is Running")

})

app.listen(port,(error)=>{
    if (!error) {
        console.log("Server is running on port" +port)
    }
    else
    {
        console.log("Error : " +error)
    }
})
