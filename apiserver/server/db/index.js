const mysql=require('mysql')
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'miyoupu'
})
module.exports=function(sql){
    return new Promise((resolve,rejeck)=>{
        pool.query(sql,(err,rows)=>{
            if(err){
                rejeck(err)
            }
            resolve(rows)
        })
    })
}