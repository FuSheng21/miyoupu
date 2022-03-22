
const express = require("express");
const db = require("../db");
const { formatData } = require("../utils");

const router = express.Router();
module.exports = router;

//获取购物车数据
router.get("/", async (req, res) => {
  const sql = `select * from cart`;
  const data = await db(sql);
  if (data) {
    res.send(formatData.success(data));
  } else {
    res.send(formatData.fail());
  }
});

// 获取用户收货信息
router.get("/address/:id", async (req, res) => {
  const { id } = req.params;
  const sql = `select address from cart where user_id=${id}`;
  const data = await db(sql);
  if (data) {
    res.send(formatData.success(data[0]));
  } else {
    res.send(formatData.fail());
  }
});

//添加购物车
router.post("/", async (req, res) => {
  const { userid, goodslist } = req.body;
  const sql = `update cart set goodslist='${goodslist}' where user_id=${userid}`;
  const data = await db(sql);
  if (data) {
    res.send(formatData.success());
  } else {
    res.send(formatData.fail());
  }
});

// 修改收货地址
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { aid, name, tel, address } = req.body;
  if (!(aid && name && tel && address)) {
    res.send(formatData.fail());
  }
  let sql = `select address from cart where user_id=${id}`;

  let data = await db(sql);

  data = JSON.parse(data[0].address);

  data.map((item) => {
    if (item.id == aid) {
      (item.name = name),
        (item.tel = Number(tel)),
        (item.address = address);
    }
  });
  data = JSON.stringify(data);

  sql = `update cart set address='${data}' where user_id=${id}`;

  const result = await db(sql);
  if (result) {
    res.send(formatData.success({ msg: "修改收货信息成功！" }));
  } else res.send(formatData.fail());
});

// 获取用户购物车数据
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const sql = `select * from cart where user_id=${id}`;
  const data = await db(sql);
  if (data) {
    res.send(formatData.success(data[0]));
  } else res.send(formatData.fail());
});

//新增收货地址
router.post("/address/:id", async (req, res) => {
  const { id } = req.params;
  const { name, tel, address } = req.body;

  if (!(id && name && tel && address)) {
    res.send(formatData.fail());
  }

  let sql = `select address from cart where user_id=${id}`;

  let nowdata = await db(sql);

  const result = nowdata[0].address;

  let data;
  if (result == null||result==[]) {
    data = [];
  } else {
    data = JSON.parse(result);
  }

  const msg = {
    id: data.length + 1,
    name: name,
    tel: Number(tel),
    address: address,
  };
  data.push(msg);

  data = JSON.stringify(data);

  sql = `update cart set address='${data}' where user_id=${id}`;

  const datas = await db(sql);
  if (datas) {
    res.send(formatData.success({ msg: "添加收货地址成功！" }));
  } else {
    res.send(formatData.fail());
  }
});

//删除收货地址
router.delete('/address/:uid',async (req,res)=>{
  const { uid } = req.params;
  const {id}=req.body
  if(!uid){
    res.send(formatData.fail())
  }

  let sql = `select address from cart where user_id=${uid}`;

  let data = await db(sql);

  data = JSON.parse(data[0].address);

  data=data.filter(item=>{
    return item.id!=id
  })
  data = JSON.stringify(data);

  sql = `update cart set address='${data}' where user_id=${uid}`;

  const datas = await db(sql);
  if (datas) {
    res.send(formatData.success({ msg: "删除收货地址成功！" }));
  } else {
    res.send(formatData.fail());
  }
})
