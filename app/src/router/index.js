import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Reg from '../views/Reg.vue'
import Category from '../views/Category.vue'
import Cart from '../views/Cart.vue'
import Mine from '../views/Mine.vue'
import Message from '../views/Message.vue'
import Goods from '../views/Goods.vue'
import NotFound from '../views/NotFound.vue'
import Order from '../views/Order.vue'
import Shouhuo from '../views/Shouhuo.vue'
import Edit from '../views/Edit.vue'
import Goodslist from '../views/Goodslist.vue'


Vue.use(VueRouter)
const router = new VueRouter({
  routes:[
    {
      path:'/',
      // 路由重定向
      redirect:'/home',
      // redirect:{name:'Home'}
    },
    // 当浏览器地址为/home时，渲染Home组件的内容
    {
      path:'/home',
      component:Home,
      name:'Home',
    },
    {
      path:'/reg',
      component:Reg
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/cart',
      component:Cart,
      // 路由元信息：路由附带信息
      meta:{
        requireAuth:true
      }
    },
    {
      path:'/mine',
      component:Mine,
      meta:{
        requireAuth:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        requireAuth:true
      }

     
    },
    {
      path:'/shouhuo',
      component:Shouhuo,
      meta:{
        requireAuth:true
      }
     
    },
    {
      path:'/edit',
      name: "Edit",
      component:Edit,
      meta:{
        requireAuth:true
      }
     
    },
    
    {
      path:'/message',
      component:Message
    },
    {
      path:'/category',
      component:Category
    },
    {
      path:'/goodslist',
      component:Goodslist
    },

    {
      path:'/goods/:id',
      component:Goods,
      name:'Goods',
    },

    // 404页面
    {
      path:'/notfound',
      component:NotFound,
    },
    {
      path:'*',
      redirect:'/notfound'
    }
  ]
})
// 全局路由守卫
router.beforeEach(function(to,from,next){
 
  // console.log('beforeEach');
  // 判断进入的页面是否需要登录才可访问
    if(to.meta.requireAuth){
    // 获取本地存储信息，判断是否登录
    let userInfo = localStorage.getItem('userInfo')
    try{
      userInfo = JSON.parse(userInfo) || {}
    }catch(err){
      userInfo = {}
    }

    if(userInfo.id){
      // 假设所有的用户都是好人,先放行，后校验
      // 如果用户已登录，则校验用户身份
      // console.log('userInfo.username',userInfo);
      
      router.app.$request.get('/user/verify',
        {
         headers:{
          authorization:userInfo.authorization
        }
        }
        
      ).then(({data})=>{
        // console.log(1);
        // console.log('userInfo',userInfo);
        // console.log('data',data);
        // updateStorage('userInfo', data)
        if(data.code === 400){
          // console.log(2);
          localStorage.removeItem('userInfo')
          router.push({
            path:'/login',
            query:{
              // 用户访问的目标页面
              targetUrl:to.fullPath
            }
          })
        }
      })
      // console.log(3);
      next()
    }else{
      // console.log(4);
      router.push({
        path:'/login',
        query:{
          // 用户访问的目标页面
          targetUrl:to.fullPath
        }
      })
    }
  }else{

    next();
  }
})
export default router;