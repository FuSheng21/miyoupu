const express = require("express");
const db = require("../db");
const { formatData } = require("../utils");

const router = express.Router();
module.exports = router;
//获取订单列表
router.get('/',async (req,res)=>{
  const {page=1,size=10,total='true'}=req.body
  const idx = (page - 1) * size;
  const qty = Number(size);
  let sql=`select * from orders`
  const number=await db(sql)
  const totals=number.length
  sql+=` limit ${idx},${qty}`
  const data=await db(sql)
  if(data){
    if(total==='fasle'){
      res.send(formatData.success(data))
    }else if(total==='true'){
      res.send(formatData.success({data,total:totals}))
    }
  }else{
    res.send(formatData.fail())
  }
})
//添加订单
router.post('/',async (req,res)=>{
  const {username,goodslist,phone,address}=req.body
  const sql=`insert into orders (username,goodslist,phone,address)
   values ('${username}','${goodslist}',${phone},'${address}')`
   const data=await db(sql)
   if(data){
     res.send(formatData.success({msg:'订单添加成功！'}))
   }else{
     res.send(formatData.fail())
   }
})
//删除订单
router.delete('/:id',async (req,res)=>{
  const {id}=req.params
  const sql=`delete from orders where id=${id}`
  const data=await db(sql)
  if(data){
    res.send(formatData.success({msg:'订单删除成功！'}))
  }else{
    res.send(formatData.fail())
  }
})
//获取用户订单
router.get('/:id',async (req,res)=>{
  const {id}=req.params
  const sql=`select * from orders where user_id=${id}`
  const data=await db(sql)
  if(data){
    res.send(formatData.success(data))
  }else{
    res.send(formatData.fail())
  }
})