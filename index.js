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

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',require("./routes/blog"));

app.use((err,req,res,next)=>{
     if(err){
         res.json({error:err.message});
     }
     else{
         console.log(req.body)
          next();
     }
});

app.listen(3000,()=>console.log("server run at 3000"))