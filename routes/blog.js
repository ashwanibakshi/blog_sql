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

router.post('/blog/add',(req,res,next)=>{
    try {
       
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

router.get('/blog/:id',(req,res,next)=>{
     try {
        connect.getConnection((err,connection)=>{
            if(err){
                next(err);
            }
            else{
             var sql = "select * from blogs where id = "+req.params.id;
             connection.query(sql,(err,result)=>{
                   if(err){
                       next(err);
                   }
                   else{
                       res.json({data:result})
                   }
             });
             connection.release(); 
            }
        });    
     } catch (error) {
         next(error);
     }
});

router.put('/blog/update',(req,res,next)=>{
    try {
         connect.getConnection((err,connection)=>{
              if(err){
                  next(err);
              }
              else{  
            connection.query('update blogs set title=?,description=? where id=?',[req.body.title,req.body.description,req.body.id],(err,result)=>{
                     if(err){
                         next(err);
                     }
                     else{
                        var sql = "select * from blogs where id = "+req.body.id;
                        connection.query(sql,(err,resultt)=>{
                          if(err){
                              next(err);
                          }
                          else{
                              res.json({data:resultt});
                          }
                        });
                     }
                });
              }
              connection.release();
         });
    } catch (error) {
        next(error);
    }
});

router.get('/showallblog',(req,res,next)=>{
    try {
        connect.getConnection((err,connection)=>{
            if(err){
                next(err);
            }
            else{
              var sql = "select * from blogs order by id desc"
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
    } catch (error) {
        next(error);
    }
});

router.delete('/blog/delete/:id',(req,res,next)=>{
      try {
         connect.getConnection((err,connection)=>{
               if(err){
                   next(err);
               } 
               else{
                  var sql = "delete from blogs where id = "+req.params.id;
                  connection.query(sql,(err,result)=>{
                     if(err){
                         next(err);
                     } 
                     else{
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
                  }); 
               }
         }); 
      } catch (error) {
          next(error);
      }
});


module.exports = router;