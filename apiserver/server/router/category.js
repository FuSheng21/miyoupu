const express = require("express");
const db = require("../db");
const { formatData } = require("../utils");

const router = express.Router();
module.exports = router;

//获取分类列表
router.get("/", async (req, res) => {
  const { page = 1, size = 10, total = "true" } = req.body;

  const idx = (page - 1) * size;
  const qty = Number(size);

  let sql = `select category from category`;
  const number = await db(sql);
  const totals = number.length;

  sql = `select * from category  limit ${idx},${qty}`;
  const data = await db(sql);
  if (data) {
    if (total === "false") {
      res.send(formatData.success(data));
    } else {
      res.send(formatData.success({ data, total: totals }));
    }
  } else {
    res.send(formatData.fail());
  }
});
//分类添加
router.post("/", async (req, res) => {
  const { category, categorytwo } = req.body;

  let sql = `insert into category `;

  if (categorytwo) {
    sql += `(category,categorytwo) values ('${category}','${categorytwo}')`;
  } else {
    sql += `(category) values ('${category}')`;
  }
  
  const data = await db(sql);
  if (data) {
    res.send(formatData.success());
  } else {
    res.send(formatData.fail());
  }
});
//分类删除
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const sql = `delete from category where id=${id}`;
  const data = await db(sql);
  if (data) {
    res.send(formatData.success());
  } else {
    res.send(formatData.fail());
  }
});
//分类修改
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, nametwo } = req.body;

  let sql = `update category set `;
  sql += `category='${name}',`;
  if (nametwo) {
    sql += `categorytwo='${nametwo}',`;
  }
  sql = sql.substring(0, sql.length - 1);
  sql += ` where id='${id}'`;
  const data=await db(sql)
  if(data){
    res.send(formatData.success());
  }else{
    res.send(formatData.fail())
  }
});
