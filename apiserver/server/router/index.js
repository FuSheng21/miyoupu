const express=require('express')
const goodsRouter=require('./goods')
const userRouter=require('./user')
const categoryRouter=require('./category')
const orderRouter=require('./order')
const cartRouter=require('./cart')
const uploadRouter=require('./upload') 



const router=express.Router();
module.exports=router

router.use(
    express.urlencoded({extended:false}),
    express.json()
)

router.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Headers","content-type,authorization");
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS,PATCH");
    next();
})

router.use('/goods',goodsRouter)
router.use('/user',userRouter)
router.use('/category',categoryRouter)
router.use('/orders',orderRouter)
router.use('/cart',cartRouter)
router.use('/upload',uploadRouter)

