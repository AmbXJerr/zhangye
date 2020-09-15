import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 导入模块
import menu from "./modules/menu"
import role from "./modules/role"
import admin from "./modules/admin"

let store= new Vuex.Store({
    state:{
        iscollapse:false

    },
    mutations:{
        TOGGLE(state){
          state.iscollapse=!state.iscollapse
        }
    },
    modules:{
        menu,role,admin
    }
})
export default store;