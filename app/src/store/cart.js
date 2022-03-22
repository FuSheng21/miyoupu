import {updateStorage} from '@/utils'

// 数据持久化
let cartlist = localStorage.getItem('cartlist'); // null
try{
    cartlist = JSON.parse(cartlist) || [];
}catch(err){
    cartlist = []
}
export default {
    state:{
        cartlist,
    },
    getters:{
        totalPrice(state,getters){
            return state.cartlist.reduce((val,item)=>{
                return val+item.price*item.qty
            },0)

        },
    },
    mutations:{
        add(state,payload){
            state.cartlist.unshift(payload)

            // 写入本地存储
            updateStorage('cartlist',state.cartlist)
        },
        // store.commit('changeqty',{_id,qty})
        changeqty(state,{_id,qty}){
            state.cartlist.forEach(item=>{
                if(item._id === _id){
                    item.qty = qty
                }
            })

            // 写入本地存储
            updateStorage('cartlist',state.cartlist)
        },

        // 删除购物车商品
        // store.commit('remove',123)
        // store.commit('remove,{_id:123})
        remove(state,{_id}){
            if(!Array.isArray(_id)){
                _id = [_id]
            }
            state.cartlist = state.cartlist.filter(item=>!_id.includes(item._id));
            updateStorage('cartlist',state.cartlist)
        },
    },
    actions:{
        globalLogin(){
            console.log('cart.globalLogin')
        }
    }

}


