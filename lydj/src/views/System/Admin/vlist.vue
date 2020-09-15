<template>
  <div class="table-bg">
    <el-table :data="adminlist">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="username" label="管理员名称"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="修改">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="edit(scope.row)"
            circle
            icon="el-icon-edit"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            @click="del(scope.row.id)"
            circle
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delAdmin } from "@/request/admin";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      adminlist: "admin/adminlist",
    }),
  },
  mounted() {
    if (!this.adminlist.length) {
      this.get_admin_list();
    }
  },
  methods: {
    ...mapActions({
      get_admin_list: "admin/get_admin_list",
    }),
    edit(val) {    
      this.$emit('edit',{...val})
    },
    async del(id) {
      this.$confirm("确定删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await delAdmin(id);
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.get_admin_list(); //重新获取列表
        } else {
          this.$message.error(res.msg);
        }
      }).catch(()=>{})
    },
  },
  components: {},
};
</script>
<style scoped>
</style>