/**
 * Token操作
    * 创建token方法：create
    * 验证token方法：verify
 */

 const jwt = require('jsonwebtoken');

 //密钥：用于加密的key
const key = 'laoxie'
 
/**
 * 
 * @param {Object}          data            需要写入token的加密的数据
 * @param {Number|String}   expiresIn       有效期
 * @returns {String}                        返回token（一段加密后拥有有效期的字符）
 */
 exports.create = (data, expiresIn = 60 * 60 * 8) => {
     // username: 用于加密的用户名
     // expires: token有效期(单位: s)，默认2小时(2h)
 
 
     //生成 Token：根据传入用户名和key进行加密，并设置有效期
     let token = jwt.sign(data, key, {
         expiresIn
     });
     return token;
 }
 
 /**
  * 校验token
  * @param {String} token 
  * @returns {Boolean}      token校验是否成功
  */
 exports.verify = (token) => {
     let res = false;
     try {
        //  jwt.verify() 
        // 校验成功，得到加密前的数据（解密）
        // 校验失败，抛出错误
         res = jwt.verify(token, key);//得出解密后的结果Object:{username:xxx...}
         res = true;
     } catch (err) {
         res = false;
     }
 
     return res;
 }