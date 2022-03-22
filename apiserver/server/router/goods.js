const express = require("express");
const db = require("../db");
const { formatData } = require("../utils");

const router = express.Router();
module.exports = router;
//获取商品列表
router.get("/", async (req, res) => {
  const { page = 1, size = 10, category, sort, total = "true" } = req.query;

  const idx = (page - 1) * size;
  const qty = Number(size);

  let sql = `select * from goods`;

  const number = await db(sql);
  const totals = number.length;

  if (category) {
    sql += ` where category like '%${category}%'`;
  }
  if (sort) {
    // 0: asc   升序
    // 1: desc  降序
    // 'price','price,0','price,1'
    let [key, type = 0] = sort.split(",");

    sql += ` order by ${key}`;
    if (type == 1) {
      sql += ` desc`;
    }
  }
  sql += ` limit ${idx},${qty}`;


  const data = await db(sql);
  if (data) {
    if (total === "fasle") {
      res.send(formatData.success(data));
    } else if (total === "true") {
      res.send(formatData.success({ data, total: totals }));
    }
  } else {
    res.send(formatData.fail());
  }
});

//获取首页商品数据
router.get("/home", async (req, res) => {
  const { page = 1, size = 10 } = req.query;
  const idx = (page - 1) * size;
  const qty = Number(size);
  const sql = `select * from goods where homeid !="" order by homeid asc limit ${idx},${qty}`;
  const data = await db(sql);
  if (data) {
    res.send(formatData.success(data));
  } else {
    res.send(formatData.fail());
  }
});

//添加商品
router.post("/", async (req, res) => {
  const {
    goods_id,
    name,
    cover_url,
    market_price,
    price,
    category,
    is_sold_out,
  } = req.body;
  const sql = `insert into goods (goods_id,name,cover_url,market_price,price,category,is_sold_out)
            values (${goods_id},'${name}','${cover_url}',${market_price},${price},'${category}','${is_sold_out}')  
  `;
  const data = await db(sql);
  if (data) {
    res.send(formatData.success({ msg: "商品添加成功！" }));
  } else res.send(formatData.fail());
});

//删除商品,支持数组
router.delete("/all", async (req, res) => {
  let { id } = req.body;
  if (!id) {
    res.send(formatData.fail());
  }
  id = JSON.parse(id);
  let sql = `delete from goods where goods_id`;
  if (typeof id == "number") {
    sql += ` =${id}`;
  }
  if (typeof id == "object") {
    sql += ` in (`;
    id.map((item) => {
      sql += `${item},`;
    });
    sql = sql.substring(0, sql.length - 1);
    sql += `)`;
  }
  const data = await db(sql);
  if (data) {
    res.send(formatData.success({ msg: "商品删除成功！" }));
  } else {
    res.send(formatData.fail());
  }
});

//获取商品详情
router.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  const sql = `select * from xiangqing where id=${id}`;
  const data = await db(sql);
  if (data) {
    res.send(formatData.success(data[0]));
  } else {
    res.send(formatData.fail());
  }
});

// 获取单个商品
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const sql = `select * from goods where goods_id=${id}`;
  const data = await db(sql);
  if (data) {
    res.send(formatData.success(data[0]));
  } else {
    res.send(formatData.fail());
  }
});

//修改商品
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  
  const { name, cover_url, market_price, price } = req.body;

  let sql = `update goods set `;

  if (name) {
    sql += `name='${name}',`;
  }
  if (cover_url) {
    sql += `cover_url='${cover_url}',`;
  }
  if (market_price) {
    sql += `market_price='${market_price}',`;
  }
  if (price) {
    sql += `market_price='${market_price}',`;
  }
  sql = sql.substring(0, sql.length - 1);
  sql += ` where goods_id='${id}'`;
  const data = await db(sql);
  if (data) {
    res.send(formatData.success());
  } else {
    res.send(formatData.fail());
  }
});
