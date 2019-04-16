<template>
<el-row>
  <el-col ref = "article" :v-mode="article" prop="article">
    <!-- <img src="../../assets/logo.png" class="image"> -->
      <div>
        <span>{{article.title}}</span>
         <span>{{article.keyword}}</span>
          <div class="content" v-html="article.content"></div>
        <div class="bottom clearfix">
            <div class="insertname">{{ article.insertname }}</div>
          <time class="time">{{ article.creattime }}</time>
          <!-- <el-button type="text" class="button">操作按钮</el-button> -->
        </div>
      </div>
  </el-col>
</el-row>

</template>


<script>
  export default {
      name:'Article',
    data() {
      return {
       article: {
           id:'',
           title:'',
           keyword:'',
           content:'',
           insertname:'',
           creattime:''
       }
      }
    },
    methods: {
      /* handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }, */
      articleDetail(){
        
      },
      getArticle(){
        const self=this;
        let id = this.$route.query.articleId;
        console.log(id);
        this.$http.get('/api/getArticleById',{params: {id:id}})
        .then((res) => {
            console.log(res);
					if (res.data.code ==1) {
                let result = res.data.data[0];
                self.article.id = result.id;
                self.article.title = result.title;
                self.article.keyword = result.keyword;
                self.article.content = result.content;
                self.article.insertname = result.insertname;
                self.article.creattime = result.creattime;
                    }
        }).then(function(error){
            console.log(error);
        })
    }
    },
    mounted(){
        this.getArticle();
    },
    computed:{
        handledCont(){ 
let _cont = this.article.content; 
return _cont 
.replace(_cont ? /&(?!#?\w+;)/g : /&/g, "&") 
.replace(/</g, "<") 
.replace(/>/g, ">") 
.replace(/"/g, '"') 
.replace(/'/g, "'") 
} 
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.el-card{
    width: 430px;
    height:56 0px;
    margin-bottom: 10px;
}
 .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
      margin: auto;
    width: 320px;
    height: 320px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
