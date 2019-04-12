<template>
    <el-row class="content">
       <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="infoForm.title"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="keyword">
            <el-input v-model="infoForm.keyword"></el-input>
          </el-form-item>
<!--使用编辑器
-->
          <el-form-item label="正文">
            <div class="edit_container">
              <quill-editor v-model="infoForm.content"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOption" @ready="onEditorReady($event)">
              </quill-editor>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
</template>

<script>
import {quillEditor} from "vue-quill-editor";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default{
  name: 'Manage',
  components:{
    quillEditor
  },
  data(){
    return{
      editorOption: {},
      infoForm: {
          title: '',
          keyword: '',
          content:'',
          insertname:sessionStorage.getItem('username')
        },
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入详细内容', trigger: 'blur'}
          ]
        }
    }
  },
  methods:{
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      },
      onSubmit() {
        //提交
//this.$refs.infoForm.validate，这是表单验证
        this.$refs.infoForm.validate((valid) => {
          if(valid) {
            this.$http.post('/api/addArticle',this.infoForm).then(res => {
              if(res.data.code == 1) {
                this.$message({
                  message: "新增文章成功!",
                  type: 'success'
                });
                this.$router.push('/Welcome');
              } else {
                this.$message({
                  message: "失败！",
                  type:'error'
                });
              }
            });
          }
        });
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.el-row.content{
    padding:16px;
    width: 100%; 
    margin: auto;
    height: 100%;
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
