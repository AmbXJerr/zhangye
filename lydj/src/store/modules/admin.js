
import { getAdmin } from "../../request/admin";
 
export default {
    namespaced:true,
    state: {
        adminlist:[] ,       //角色列表
        page:1,
        size:10
    },
    getters: {
        adminlist:state =>state.adminlist

    },
    mutations: {
        SET_LIST(state,data) {
            state.adminlist=data;

        }
    },
    actions: {
        // 请求列表
        async get_admin_list({commit,state}) {
            let res = await getAdmin(state.page,state.size);
           commit('SET_LIST',res)
        }
    }
};