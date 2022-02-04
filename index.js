const express   = require("express");
const connect   = require("./config/db");

connect.getConnection((err)=>{
    if(err){
        console.log(err);
        connect.end();
    }
    else{
    console.log('connect to server');
    }
})

const app = express();

app.listen(3000,()=>console.log("server run at 3000"))