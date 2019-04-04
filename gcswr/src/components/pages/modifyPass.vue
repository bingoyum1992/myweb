<template>
    <el-row class="content">
        <el-row>
            <el-input
                v-model="name"
                placeholder="密码"
                type="text">
            </el-input>
            <el-input
                v-model="password"
                placeholder="确认密码"
                type="password">
            </el-input>
            <el-button type='primary' @click="login">确认</el-button>
        </el-row>
    </el-row>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'gcswr',
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      //console.log(this.name)
      let formdata = {
        name: this.name,
        password: this.password
      }
      this.$http.post('/user/login', formdata)
        .then((res) => {
					if (res.data.code === 1) {
						this.$message({
							type:'success',
							message:'登录成功！'
						})
            sessionStorage.setItem('username', res.data.data[0].swry_dm)
            this.$router.push('/welcome')
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.el-row.content{
    padding:16px;
    width: 40%; 
    margin: auto;
}
.title{
font-size: 28px;
}
.el-input{
    margin:12px 0
}
.el-button{
    margin-top:12px
}
</style>
