const express = require("express");
const db = require("../db");
const { formatData, cryPasw } = require("../utils");
const token = require("../utils/token");

const router = express.Router();
module.exports = router;

//验证用户名可用性
router.get("/check", async (req, res) => {
  const { username } = req.query;
  const sql = `select * from user where username='${username}'`;
  const data = await db(sql);
  if (data.length > 0) {
    res.send(formatData.fail());
  } else {
    res.send(formatData.success());
  }
});

//用户注册
router.post("/reg", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const sql = `select * from user where username='${username}'`;
    const data = await db(sql);
    
    setTimeout(async () => {
      const userid = `select id from user where username='${username}'`;
      const id = await db(userid);
      const uid = id[0].id;
      const idsql = `insert into cart (user_id) value (${uid})`;
      await db(idsql);
    }, 10);

      if (data.length > 0) {
        res.send(formatData.fail());
      } else {
    const pasw = cryPasw(password);
        const sql = `insert into user (username,password) values ('${username}','${pasw}')`;
        await db(sql);
        res.send(formatData.success());
      }
    } else {
      res.send(formatData.fail());
    }
});



//验证token有效性
router.get('/verify',async (req,res)=>{
  const {authorization}=req.headers
  const result=token.verify(authorization)
  if(result){
    res.send(formatData.success())
  }else{
    res.send(formatData.fail())
  }
})


//用户登录
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const pasw = cryPasw(password);
    const sql = `select id,username,tximg_url,role from user where username='${username}' and password='${pasw}'`;
   
    let result;
    try {
      // 第一次登录：需要用户名和密码确认用户身份
      let data = await db(sql);
      data = data[0];
      // // 如果查询到数据，则确认用户身份
      if (data) {
        // 确认用户身份后，创建token
        let authorization = token.create({ username });
        data.authorization = authorization;
        result = formatData({ data });
      } else {
        result = formatData({ code: 401, msg: "用户名或密码错误" });
      }
    } catch (err) {
      result = formatData({ code: 400, msg: err });
    }
    res.send(result);
  }


  
});
//用户列表
router.get("/", async (req, res) => {
  const { page = 1, size = 10, total = "true" } = req.body;

  let sql = `select id,tximg_url,username,role,addtime from user`;

  const idx = (page - 1) * size;
  const qty = Number(size);

  const number = await db(sql);
  const totals = number.length;

  sql += ` limit ${idx},${qty}`;

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



/* 后台 */
//用户添加
router.post("/", async (req, res) => {
  const { username, password, role } = req.body;
  if (username && password && role) {
    const pasw = cryPasw(password);
    const sql = `insert into user (username,password,role) values('${username}','${pasw}','${role}')`;
    const data = await db(sql);
    if(data){
      res.send(formatData.success());
    }
  } else {
    res.send(formatData.fail());
  }
});


//单个用户
router.get('/:id',async (req,res)=>{
  const { id } = req.params;
  if(!id){
    res.send(formatData.fail())
  }
  const sql=`select id,username,tximg_url,role from user where id=${id}`
  const data=await db(sql)
  if (data) {
    res.send(formatData.success(data[0]));
  } else {
    res.send(formatData.fail());
  }
})

// 删除用户
router.delete('/',async(req, res) => {
  const {ids} = req.body

  let sql2 ='delete from user where id in ('

  if(Array.isArray(ids)){
    ids.forEach((item)=>{
      sql2+=item+','
    })
    sql2=sql2.slice(0,sql2.length-1)+')'
  }else{
    sql2 = `delete from user where id='${ids}'`
    
  }

  const data = await db(sql2);

  if (data) {
    res.send(formatData.success());
  } else {
    res.send(formatData.fail());
  }
})

//修改用户
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { username,password,role} = req.body;

  if(!(username||password||role)){
    res.send(formatData.fail())
  }

  let sql = `update user set `;

  if (username) {
    sql += `username='${username}',`;
  }
  if (password) {
    const pasw = cryPasw(password);
    sql += `password='${pasw}',`;
  }
  if (role) {
    sql += `role='${role}',`;
  }

  sql = sql.substring(0, sql.length - 1);

  sql += ` where id='${id}'`;


  const data = await db(sql);
  if (data) {
    res.send(formatData.success());
  } else {
    res.send(formatData.fail());
  }
});
