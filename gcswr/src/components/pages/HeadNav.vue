<template>
  <el-menu  background-color="#8f97ff" text-color="#fff" active-text-color="#ffd04b" :default-active= "activeIndex" class="el-menu-demo" mode="horizontal" :router= "true">
  <el-menu-item index="Langart">处理中心</el-menu-item>
    <el-menu-item index="Piction">订单管理</el-menu-item>
  <el-menu-item index="Sport">订单管理</el-menu-item>
    <el-menu-item index="Sport">订单管理</el-menu-item>
      <el-submenu class = "user-info" index="2">
    <template slot="title">{{username}}</template>
    <el-menu-item index="userCenter">个人中心</el-menu-item>
    <el-menu-item index="modifyPass">密码修改</el-menu-item>
    <el-menu-item @click="loginOut">退出</el-menu-item>
  </el-submenu>
</el-menu>
</template>

<script>
  export default {
    name:'HeadNav',
    data() {
      return{
        activeIndex: 'Langart'
      }
    },
    computed: {
      username(){
      let username = sessionStorage.getItem('username');
      return username;
    }
    },  
    methods: {
      loginOut(){
        sessionStorage.removeItem('username');
        this.$router.push('/')
      }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.user-info {
  float: right;
  width:150px;
  text-align:center;
}
</style>
