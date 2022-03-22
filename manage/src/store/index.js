import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router';
import request from '../utils/request'
import authRoutes from '../router/authRoutes'
import {updataStorage} from '../utils/storage'

let adminuserInfo = localStorage.getItem('adminuserInfo'); // null
try{
    adminuserInfo = JSON.parse(adminuserInfo) || {};
}catch(err){
    adminuserInfo = {}
}

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    adminuserInfo,
    addedRoute:false,
  },
  getters:{
    isLogin(state){
      return !!state.adminuserInfo.id
    }
  },
  mutations: {
    login(state, payload) {
      state.adminuserInfo = payload;
      updataStorage('adminuserInfo', payload)
    },

    addRoute(state){
        if(!state.addedRoute){
            router.addRoute(authRoutes);
            state.addedRoute = true;
        }
    },
    removeRoute(){
      router.addRoute({
        path:'/manage',
        name:'Manage',
        children:[]
      })
    }
  },
  actions: {
    async login(ctx,payload){
      const {data} = await request.post("/user/login", payload);
      if(data.code === 200){
        ctx.commit("login", data.data);
        ctx.commit('addRoute');
      }
      return data;
    },
  }
});
if(store.getters.isLogin){
  store.commit('addRoute');
}

export default store;