const express = require("express");
const connect = require("../config/db");

const router  = express.Router();

router.post('/author/add',(req,res,next)=>{
    try {
        connect.getConnection((err,connection)=>{
               if(err){
                   next(err);
               }
               else{
                   let data = {
                       namee : req.body.name,
                       email: req.body.email
                   }
                var sql = "insert into author set"+connect.escape(data);
                connection.query(sql,(err,result)=>{
                    if(err){
                        next(err);
                    } 
                    else if(result.affectedRows>0){
                  var sql2 = "select * from author";
                  connection.query(sql2,(err,resultt)=>{
                       if(err){
                           next(err);
                       }
                       else{
                         res.json({data:resultt});    
                       }
                    }); 
                    }
                    else{
                        next({error:"no data added"});
                    }
                });
               }
        });
    } catch (error) {
        next(error);
    }
});

router.post('/add',(req,res,next)=>{
    try {
        console.log("data",req.body)
        let data = {
            title      : req.body.title,
            description: req.body.description, 
            authorid     : parseInt(req.body.authorid)
            }
        connect.getConnection((err,connection)=>{
            if(err){
                next(err)
            }
            else{
            var sql = 'insert into blogs set'+connect.escape(data);
            connection.query(sql,(err,result)=>{
                  if(err){
                       next(err);
                  }
                  else if(result.affectedRows>0){
                    var sql2 = "select * from blogs";
                    connection.query(sql2,(err,resultt)=>{
                       if(err){
                           next(err);
                       }
                       else{
                           res.json({data:resultt});
                       }
                    });
                  }
                  else{
                      next({error:"no data added"});
                  }
            });
            connection.release();
           }
        })
     } catch (error) {
        next(error);
    }
});

router.get('/showall',(req,res,next)=>{
     connect.getConnection((err,connection)=>{
           if(err){
               next(err);
           }
           else{
             var sql = "select * from blogs order by id desc LIMIT "+5
             connection.query(sql,(err,result)=>{
                 if(err){
                   next(err);
                 }
                 else{
                     res.json({data:result});
                 }
             });
             connection.release();
           }
     });
});



module.exports = router;