<template>
  <div class="heaher">
    <div class="lt">
      <el-button  v-if="iscollapse" type="primary" @click="TOGGLE" size="small" class="toggle-btn" icon="el-icon-s-unfold"></el-button>
      <el-button  v-else type="primary" size="small" @click="TOGGLE" class="toggle-btn" icon="el-icon-s-fold"></el-button>
      <el-breadcrumb separator="/" class="mbx">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button size="small" v-if="$route.path!='/index'" @click="$router.back()" icon="el-icon-back" circle></el-button>
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link">
          XX你好
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item> <i class="el-icon-full-screen "></i> 全屏操作</el-dropdown-item>
          <el-dropdown-item> <i class="el-icon-switch-button "></i> 退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return {};
  },
  computed:{
...mapState(['iscollapse'])
  },
  methods: {
      ...mapMutations(['TOGGLE'])
  },
  components: {},
};
</script>
<style scoped>
.heaher {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.heaher .lt {
  display: flex;
  align-items: center;
}
.heaher .mbx {
  margin: 0 20px;
}
</style>