<template>
  <el-menu  id = "nav" background-color="#8f97ff" text-color="#fff" active-text-color="#ffd04b" :default-active= "onRoutes" class="el-menu-demo" mode="horizontal" router>
  <el-menu-item index="welcome">首页中心</el-menu-item>
    <el-menu-item index="Piction">党建活动</el-menu-item>
  <el-menu-item index="Sport">税收动态</el-menu-item>
    <el-menu-item index="Manage">管理中心</el-menu-item>
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
    },
      onRoutes(){
        return this.$route.path.replace('/',''); 
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
