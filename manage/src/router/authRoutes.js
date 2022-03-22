import Manage from '../views/Manage.vue'
import Home from '../views/manage/Home.vue'
import User from '../views/manage/user/Default.vue'
import UserList from '../views/manage/user/List.vue'
import UserAdd from '../views/manage/user/Add.vue'
import UserEdit from '../views/manage/user/Edit.vue'
import Goods from '../views/manage/goods/Default.vue'
import GoodsList from '../views/manage/goods/List.vue'
import GoodsAdd from '../views/manage/goods/Add.vue'
import GoodsEdit from '../views/manage/goods/Edit.vue'
import Order from '../views/manage/order/Default.vue'
import OrderList from '../views/manage/order/List.vue'
import OrderAdd from '../views/manage/order/Add.vue'
import OrderEdit from '../views/manage/order/Edit.vue'
import Ad from '../views/manage/category/Ad.vue'
import List from '../views/manage/category/List.vue'
import HomeDy from '../views/manage/HomeDy.vue'
export default {
    path:'/manage',
    name:'Manage',
    component:Manage,
    children:[
        {
            path:'home',
            component:Home
        },
        {
            path:'homeDy',
            component:HomeDy
        },
        {
            path:'user',
            component:User,
            children:[
                {
                    path:'list',
                    component:UserList
                },
                {
                    path:'add',
                    component:UserAdd
                },
                {
                    path:'edit/:id',
                    component:UserEdit,
                    name:"UserEdit"
                },
            ]
        },
        {
            path:'goods',
            component:Goods,
            children:[
                {
                    path:'list',
                    component:GoodsList
                },
                {
                    path:'add',
                    component:GoodsAdd
                },
                {
                    path:'edit/:id',
                    component:GoodsEdit
                },
            ]
        },

        {
            path:'order',
            component:Order,
            children:[
                {
                    path:'list',
                    component:OrderList
                },
                {
                    path:'add',
                    component:OrderAdd
                },
                {
                    path:'edit/:id',
                    name:'OrderEdit',
                    component:OrderEdit
                },
            ]
        },
        {
            path:'ad',
            component:Ad,
            children:[
                {
                    path:'list',
                    component:List
                },
            ]
        },
        
    ]
}