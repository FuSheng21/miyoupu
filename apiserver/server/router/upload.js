const express = require("express");
const db = require("../db");
const { formatData } = require("../utils");

const router = express.Router();
module.exports = router;

const multer = require("multer");
const path = require("path");

/* 控制上传细节 */
//存储

const storage = multer.diskStorage({
  //保存位置
  destination: path.join(__dirname, "../public/uimages"),
  //格式化文件名
  filename: function (req, file, cb) {
    // console.log(file);
    //获取文件后缀名
    let ext = path.extname(file.originalname);

    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage,
  //限制文件类型
  fileFilter(req, file, cb) {
    //获取上传的文件名后缀
    let ext = path.extname(file.originalname);
    //正则校验
    cb(null, /jpe?g|png|gif/.test(ext));
  },
  //限制文件大小
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

router.post("/avatar/:uid", upload.single("avatar"), async function (req, res) {
  const { uid } = req.params;


    const sql = `update user set tximg_url='${req.file.filename}' where id=${uid}`;

    const result = await db(sql);

    if (result) {
      res.send(formatData.success({ msg: "文件上传成功" }));
    } else {
      res.send(formatData.fail());
    }
  
});
