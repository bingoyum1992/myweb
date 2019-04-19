<template>
    <el-row class="content">
       <el-col :span="24" class="warp-main">
        <el-form ref="infoForm" :model="infoForm" label-width="120px">
<!--使用编辑器
-->        <el-form-item label="标题" prop="title">
            <el-input v-model="infoForm.title"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="keyword">
            <el-input v-model="infoForm.keyword"></el-input>
          </el-form-item>
          <el-form-item label="正文">
            <div class="edit_container">
              <quill-editor v-model="infoForm.content"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOption" >
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

    export default {
         name: 'Manage',
  components:{
    quillEditor
  },
        data () {
            return {
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
        },
                title: '发布文章',
                prePage: '/',
                postTitle: '',
                postContent: '',
                editorOption: {
                    modules: {
                        toolbar: {
                            container:[
                                [{ 'header': [1, 2, 3, false] }],
                                ['bold', 'italic', 'underline', 'strike',],
                                ['blockquote', 'code-block', 'link', 'image',],
                                [{ 'color': [] }, { 'background': [] }],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'align': [] }],
                            ],
                            handlers: {'image': this.imageHandler}
                        }
                    },
                    placeholder: 'Compose an epic...',
                    readOnly: false,
                    theme: 'snow'
                },
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        methods: {
            onEditorBlur: function (quill) {
                // console.log('editor blur!', quill)
            },
            onEditorFocus: function (quill) {
                // console.log('editor focus!', quill)
            },
            onEditorChange: function ({ quill, html, text }) {
                // console.log('editor change!', quill, html, text)
                // this.postContent = html
            },
            submitPost: function () {
                console.log(this.postTitle);
                console.log(this.postContent);
            },
              /**
       * 
       * @param {路由} url 
       * @param {路由参数} params 
       * @param {文件数据} body 
       */
      upload(url, body = {}) {
        // console.log(body);
            return this.$http({
             method: "POST",
            url: url,
           data: body,
              processData: false, //必不可少参数
              traditional: true, //比不可少参数
              contentType: false,//比不可少参数
               headers: {
/*                'token': localStorage['token'],
            'originno': config.originno, */
            "Content-Type": false
          }
        }).then(
          res => res
        ).catch((error) => {
          console.log(error);
        })
      },
            imageHandler: function () {
                let input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
                input.click();
                // 监听上传
                input.onchange = () => {
                    let file = input.files[0];
                    if (/^image\//.test(file.type)) {
                        this.saveImage(file);
                    } else {
                        Toast('只能上传图片哦');
                    }
                };
            },
            saveImage: function (file) {
                let fd = new FormData();
                fd.append('image', file);

                let url = '/api/pic/add';
                this.upload(url,fd).then(res => {
                   
                        this.insertImage('/public/'+res.data.filename)
                    
                }, res => {
                    if (res.status !== 0) {
                        Toast(res.status + res.message)
                    }
                })
            },
            insertImage: function (url) {
                let range = this.editor.getSelection();
                this.editor.insertEmbed(range.index, 'image', url)
            },
             onSubmit() {
        //提交
//this.$refs.infoForm.validate，这是表单验证
        this.$refs.infoForm.validate((valid) => {
          if(valid) {
            this.infoForm.insertname = sessionStorage.getItem('username');
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
<style>
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