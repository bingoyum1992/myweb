<template>
    <el-container>
        <el-header>
            <el-menu  background-color="#8f97ff" text-color="#fff" active-text-color="#ffd04b" :default-active= "activeIndex" class="el-menu-demo" mode="horizontal" :router= "true">
  <el-menu-item index="Langart">处理中心</el-menu-item>
    <el-menu-item index="Piction">订单管理</el-menu-item>
  <el-menu-item index="Sport">订单管理</el-menu-item>
</el-menu>
        </el-header>
    </el-container>
</template>

<script>
  export default {
    name:'HeadNav',
    data() {
      return{
        activeIndex: 'Langart'
      }
    }
    
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>

</style>
