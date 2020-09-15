import $axios from "@/common/http"  //导入封装好的axios

//获取管理员
export async function getAdmin(page=1,size=10){
   let res=await $axios.get("/userlist",{
       params:{
            page,
            size
         
       }
   })
   if(res.code==200 && res.list){
       return res.list
   }else{
       return [];
   }
}
//添加管理员
export function addAdmin(data){
   return $axios.post("/useradd",data)

}
//修改管理员
export function editAdmin(data){
    return $axios.post("/useredit",data)
}
//删除管理员 删除用户的uid
export function delAdmin(uid){
    return $axios.post("/userdelete",{uid})
}