<template>
 <div>
     <el-button type="primary" @click="add">添加角色</el-button>
  <v-list @edit="edit"></v-list>
  <v-info :info="info" ref="dialog"></v-info>
 </div>
</template>

<script>
import VList from './vlist'
import VInfo from './vinfo'
export default {
 data(){
 return{
     info:{
         isAdd:false,
         isShow:false
     },
    
 }
 },
 created(){},
 methods:{
     add(){
         this.info.isAdd=this.info.isShow=true;

     },
     edit(val){
         this.info.isAdd=false;
         this.info.isShow=true;
         //调用弹框组件的setinfo方法
         this.$refs.dialog.setinfo(val);
     }
 },
 components:{
     VList,VInfo
 }
}

</script>
<style scoped>
</style>