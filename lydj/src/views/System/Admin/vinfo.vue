<template>
  <el-dialog :title="info.isAdd ? '添加' : '修改'" :visible.sync="info.isShow" width="40%">
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      <!-- 表单 -->
      <el-form-item label="管理员角色" prop="roleid">
        <el-select v-model="forminfo.roleid" placeholder="请选择角色">
          <el-option
            v-for="item in rolelist"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="管理员名称" prop="username">
        <el-input v-model="forminfo.username" placeholder="请输入管理员名称"></el-input>
      </el-form-item>

      <el-form-item label="管理员密码" prop="username">
        <el-input v-model="forminfo.password" placeholder="请输入管理员密码"></el-input>
      </el-form-item>

      <el-form-item label="管理员状态">
        <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>

      <el-form-item label>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="info.isShow = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>-->
  </el-dialog>
</template>

<script>
import { addAdmin, editAdmin } from "@/request/admin";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  roleid: "",
  username: "",
  password: "",
  status: 1,
};
let resetItem = { ...defaultItem };
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false,
        };
      },
    },
  },
  data() {
    return {
      forminfo: { ...defaultItem },
      rules: {
        roleid: [{ required: true, message: "必填!", trigger: "blur" }],
        username: [{ required: true, message: "必填!", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      rolelist: "role/rolelist",
    }),
  },
  mounted() {
    if (!this.rolelist.length) {
      this.get_role_list();
    }
  },
  created() {},
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
      get_admin_list: "admin/get_admin_list"
    }),
    setinfo(val) {
      //将数据赋给默认defaultItem;赋给表单
      //将权限节点回显到树中去
      let idarr = val.menus.split(",");
      if (idarr[0]) {
        this.checkStrictly = true;
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(idarr);
          this.checkStrictly = false;
        });
      }
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async submit() {
      if(this.isAdd && !this.forminfo.password){
        this.$message.warning('请输入密码')
        return;
      }
      //表单验证
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          //如果验证通过
          let res;
          if (this.info.isAdd) {
            //添加还是修改
            res = await addAdmin(this.forminfo);
          } else {
            res = await editAdmin(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_admin_list(); //重新获取角色列表
            this.forminfo = { ...resetItem };
            this.$refs.tree.setCheckedKeys([]); //让树没有被选中
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        this.forminfo = { ...resetItem };
      } else {
        this.setinfo(...defaultItem);
      }
    },
    cancel() {
      this.forminfo = { ...resetItem };
    },
  },
  components: {},
};
</script>
<style scoped>
</style>