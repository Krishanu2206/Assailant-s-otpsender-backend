const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

//middlewares
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/send", require("./routes/sendsmsroute"));
app.get("/hello", (req, res)=>{
    res.send({
        success : true,
        message : "Hello"
    });
})

const port = 8080;
app.listen(port, ()=>{
    console.log("server listening on port 8080");
})