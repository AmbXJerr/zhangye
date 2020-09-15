import $axios from "@/common/http"  //导入封装好的axios

//获取菜单
export async function getMenu(){
   let res=await $axios.get("/menulist?istree=1")
   if(res.code==200 && res.list){
       return res.list
   }else{
       return [];
   }
}
//添加菜单
export function addMenu(data){
   return $axios.post("/menuadd",data)

}
//修改菜单
export function editMenu(data){
    return $axios.post("/menuedit",data)
}
//删除菜单 删除的ID
export function delMenu(id){
    return $axios.post("/menudelete",{id})
}