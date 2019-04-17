
<template>
  <div>
    <quill-editor :options="editorOption" v-model="content" ref="QuillEditor" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" 
        @change="onEditorChange($event)" @ready="onEditorReady($event)"></quill-editor>
        <!-- 文件上传input 将它隐藏-->
        <el-upload class="upload-demo" :action="qnLocation" :before-upload='beforeUpload' :data="uploadData" :on-success='upScuccess'
        ref="upload" style="display:none">
        <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">点击上传</el-button>
    </el-upload>
  </div>
</template>
 
<script>
import * as Quill from 'quill' // 引入编辑器
import { upQiniu } from '@/api/manage/***'  //获取七牛token
export default {
  name: 'quilleditor',
  props: {
    quillData: {
      type: String,
      default: false
    }
  },
  data() {
    return {
        bucketQuery: {
          bucket: 'website-image'
        },
        uploadData: {},
        content:this.quillData, // 富文本编辑器内容
        editorOption:{ // 初始化富文本编辑器
          modules:{
            toolbar:[
              ['bold', 'italic', 'underline', 'strike', 'link','image', 'video'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'indent': '-1'}, { 'indent': '+1' }],
              [{ 'align': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              ['blockquote', 'code-block'],
              [{ 'size': ['small', false, 'large', 'huge'] }]
            ]
          }
        },
        qiniuaddr: 'pd6rnk9ck.bkt.clouddn.com'  // 这是七牛云空间的外链默认域名
      }
    }, 
    computed: {
      // 上传七牛的actiond地址，http 和 https 不一样
      qnLocation () {
        return location.protocol === 'http:' ? 'http://upload.qiniu.com' : 'https://up.qbox.me'
      }
    }, 
    methods: {
      // 图片上传之前调取的函数
      beforeUpload (file) {
        return this.qnUpload(file)
      },
      // 图片上传前获得数据token数据
      qnUpload (file) {
        const suffix = file.name.split('.')
        const ext = suffix.splice(suffix.length - 1, 1)[0]
        if (this.uploadType === 'image') { // 如果是点击插入图片
          // TODO 图片格式/大小限制
          return upQiniu(this.bucketQuery).then(res => {
            this.uploadData = {
              // key: `image/${suffix.join('.')}_${new Date().getTime()}.${ext}`,  //重命名
              token: res.data
            }
          })
        } else if (this.uploadType === 'video') { // 如果是点击插入视频
          return upQiniu(bucketQuery).then(res => {
            this.uploadData = {
              // key: `video/${suffix.join('.')}_${new Date().getTime()}.${ext}`,  //重命名
              token: res
            }
          })
        }
      },   
      // 图片上传成功回调 插入到编辑器中
      upScuccess (e, file, fileList) {
        let vm = this
        let url = ''
        if (this.uploadType === 'image') { // 获得文件上传后的URL地址
          url = 'http://' + this.qiniuaddr + '/' + e.key
        } else if (this.uploadType === 'video') {
          url = 'http://' + this.qiniuaddr + '/' + e.key
        }
        if (url != null && url.length > 0) { // 将文件上传后的URL地址插入到编辑器文本中
          let value = url
          // API: https://segmentfault.com/q/1010000008951906
          // this.$refs.myTextEditor.quillEditor.getSelection();
          // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
          vm.addRange = vm.$refs.QuillEditor.quill.getSelection()
          value = value.indexOf('http') !== -1 ? value : 'http:' + value
          vm.$refs.QuillEditor.quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER) // 调用编辑器的 insertEmbed 方法，插入URL
        } else {
          this.$message.error(`${vm.uploadType}插入失败`)
        }
        this.$refs['upload'].clearFiles() // 插入成功后清除input的内容
      },
        
      // 点击图片ICON触发事件
      imgHandler (state) {
        this.addRange = this.$refs.QuillEditor.quill.getSelection()
        if (state) {
          let fileInput = document.getElementById('imgInput')
          fileInput.click() // 加一个触发事件
        }
        this.uploadType = 'image'
      },
      // 点击视频ICON触发事件
      videoHandler (state) {
        this.addRange = this.$refs.QuillEditor.quill.getSelection()
        if (state) {
          let fileInput = document.getElementById('imgInput')
          fileInput.click() // 加一个触发事件
        }
        this.uploadType = 'video'  
      },
      created () {
        this.$refs = {
          QuillEditor: HTMLInputElement,
          imgInput: HTMLInputElement
        }
      },
      onEditorFocus() {
  
      },
      onEditorReady() {
  
      },
      onEditorBlur() {
  
      },
      onEditorChange({editor, html, text}) {
        this.$emit('change-content',html)
        // console.log(html)
      }
    },
    // 页面加载后执行 为编辑器的图片图标和视频图标绑定点击事件
    mounted () {
      // 为图片ICON绑定事件 getModule 为编辑器的内部属性
    //   console.log(this.$refs.QuillEditor.quill)
      this.$refs.QuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
      this.$refs.QuillEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler) // 为视频ICON绑定事件
      this.content = this.quillData
 
      let that = this
      setTimeout(function(){
        // console.log(that.quillData)
        that.content = that.quillData
      },200)
    }
}
</script>