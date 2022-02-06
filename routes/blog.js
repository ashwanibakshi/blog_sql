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

router.get('/author/:id',(req,res,next)=>{
    try {
        connect.getConnection((err,connection)=>{
            if(err){
               next(err);
            }
            else{
              connection.query("select * from author join blogs on author.id = blogs.authorid where author.id = ?",[req.params.id],(err,result)=>{
                   if(err){
                       next(err);
                   }
                   else{
                     res.json({data:result});    
                   }
              });    
            }
            connection.release();
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
                    var sql2 = 'select email from author'
                    connection.getConnection(sql2,(err,resultt)=>{
                         if(err){
                             next(err);
                         }
                         else{
                            var mailList = [];
            resultt.forEach(function(users){            //nodemailer
                mailList.push(users.email);
                return mailList;
            });
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail', 
                auth: {
                    user: 'email@email.com',
                    pass: "password"
                }
            });
            var mailOptions = {
                    to: [],
                    bcc: mailList,
                    from: 'email@email.com',
                    subject: 'new blog posted',
                    text: req.body.title
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    if(err){
                        next(err);
                    }
                    else{
                       res.json({data:"post successfully added"});
                    }
                });     
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
               connection.release();
         }); 
      } catch (error) {
          next(error);
      }
});


module.exports = router;