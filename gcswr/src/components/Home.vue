<template>
   <div class="wrapper">
       <h1>home</h1>
   <head-nav></head-nav>
   <div class="content">
       <transition name = "move" mode="out-in"><router-view></router-view></transition>

   </div>
   </div>
</template>

<script>
import HeadNav from './pages/HeadNav.vue'
  export default {
      name:'home',
    components:{HeadNav}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>

</style>
