import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import cart from './cart'

Vue.use(Vuex)

const store  = new Vuex.Store({
    // 核心配置
    // 全局状态
    state:{
        
    },
    getters:{
      
    },
    // mutations: 修改state的唯一方法，只能用与同步操作
    // store.commit(mutation,payload)
    mutations:{
        
    },

    // 一般用户异步操作
    // store.dispatch(action,payload)
    actions:{
      
    },

    // vuex模块化
    modules:{
        user,
        cart
    }
})

export default store;