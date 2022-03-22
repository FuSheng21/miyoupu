import {updateStorage} from '@/utils'
import request from '@/utils/request'


let userInfo = localStorage.getItem('userInfo'); // null
try {
    userInfo = JSON.parse(userInfo) || {};
} catch (err) {
    userInfo = {}
}

export default {
    
    state: {
        userInfo,
    },
    getters: {
        isLogin(state) {
            return !!state.userInfo.authorization;
        }
    },
    mutations: {
     
        login(state, payload) {
            state.userInfo = payload;

            updateStorage('userInfo', payload)
        },
        logout(state) {
            state.userInfo = {}
            updateStorage('userInfo', {})
        }
    },
    actions: {
        async login(context, payload) {
            const {data} = await request.post('/user/login', payload)

            context.commit('login', data.data)

            return data;
        }
    },
}