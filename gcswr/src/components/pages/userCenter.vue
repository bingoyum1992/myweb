<template>
    <div class="userCenter">
        <el-form ref="form" :v-model="form" :rules="rules">
        <el-form-item prop="name" label="用户名称">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
            <el-select v-model="form.sex">
                <el-option label="少侠" value=1></el-option>
                <el-option label="女侠" value=2></el-option>

            </el-select>
        </el-form-item>
        <el-form-item prop="age" label="年龄">
            <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号码">
            <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="自我描述">
            <el-input  type = "text" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="updateUser('form')">确定</el-button>
            <el-button  @click="onCancel()">取消</el-button>

        </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'userCenter',
  data () {
    return {
     form:{
         name:'',
         sex:'',
         age:'',
         phone:'',
         intro:''
     },
     rules:{
         sex:[{required:true,message:'请输入性别',trigger: 'blur'}]
     }
    }
  },
  methods: {
    getUserData(){
        const self=this;
        let username=sessionStorage.getItem('username');
         console.log(username);
         let formdata={
             name:username
         }
        this.$http.post('/user/getUserData',formdata)
        .then((res) => {
					if (res.data.code === 1) {
                let result = res.data.data[0];
                console.log(result);	
            self.form.name = result.name
            self.form.age = result.age;
            self.form.sex = result.sex;
            self.form.phone = result.phone;
            self.form.intro = result.intro;
          }
        }).then(function(error){
            console.log(error);
        })
    }
    },
    mounted(){
        this.getUserData();
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
