import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{},
    token:''
  },
  getters:{
    getUser(state){
      return state.user;
    },
    isLogin(state){
      return state.user.userName?true:false;
    }
  },
  mutations: {
    saveUser(state,payload={user:null,token:null}){
      state.user=payload.user;
      state.token=payload.token
    }
  },
  // 可以包含异步操作
  actions: {

  }
})
