<template>
    <el-row class="content">
        <el-form ref="form" :v-model="form" :rules="rules">
        <el-form-item prop="name" label="密码">
             <el-col :span="12">
            <el-input v-model="form.name"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item prop="password" label="密码">
             <el-col :span="12">
            <el-input v-model="form.password"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="updateUser('form')">确定</el-button>
            <el-button  @click="onCancel()">取消</el-button>

        </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form:{
      msg: 'gswr',
      name: '',
      password: ''
      }
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
.el-form{
    margin:auto;
}
</style>
