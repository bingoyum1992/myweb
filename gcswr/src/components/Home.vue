<template>
   <el-container>
       <el-header>
   <head-nav></head-nav>
       </el-header>
       <el-main>
       <transition name = "move" mode="out-in"><keep-alive><router-view></router-view></keep-alive></transition>
       </el-main>
  <el-footer>
    <p>
      国家税务总局贵阳市云岩区税务局信息中心
    </p>
  </el-footer>
      </el-container>
</template>

<script>
import HeadNav from './pages/HeadNav.vue'
  export default {
      name:'home',
    components:{HeadNav}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-header, .el-footer {
    text-align: center;
  }
  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    text-align: center;
    height: 100%;
  }
  .el-footer{
      bottom:0;
      width:1366px;
      color: #333;
    background-color: #B3C0D1;
  }
  .foot{
      font-family: "微软雅黑";
      padding-bottom: 20px;
  }
</style>
