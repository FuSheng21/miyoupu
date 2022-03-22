
const crypto=require('crypto')
// 封装formatDate函数，用以生产返回前端的数据格式
function formatData(obj={}){
    let {code=200,msg='success',data=[]} = obj
    if(code == 400 && msg == 'success'){
        msg = 'fail'
    }
    return {
        code,
        msg,
        data
    }
}
formatData.success = function(data){
    return formatData({data})
}
formatData.fail = function(){
    return formatData({code:400})
}
//加密密码
function cryPasw(data,key='h5'){
    const hash=crypto.createHmac('sha256',key)
    hash.update(data)
    const pasw = hash.digest('hex')
    return pasw
}

module.exports = {
    formatData,
    cryPasw
}