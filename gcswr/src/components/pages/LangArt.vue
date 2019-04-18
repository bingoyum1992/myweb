<template>
<el-row class="content">
  <el-col :span="8" v-for="article in articlelist" :key="article.id">
    <el-card :body-style="{ padding: '0px'}">
      <router-link :to="{
          path: `/Article`,
          query: { articleId: article.id }}">
    <img src="../../assets/logo.png" class="image">
      <div style="padding: 14px;">
        <span>{{article.title}}</span>
         <span>{{article.keyword}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ article.creattime }}</time>
          <!-- <el-button type="text" class="button">操作按钮</el-button> -->
        </div>
      </div>
              </router-link>
    </el-card>
  </el-col>
</el-row>

</template>


<script>
  export default {
    data() {
      return {
       articlelist: []
      };
    },
    methods: {
      /* handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }, */
      articleDetail(id){
        this.$router.push({
          path: `/Article`,
          query: { articleId: id }}
        )
      },
      getArticleList(){
        const self=this;
        this.$http.get('/api/getArticleList')
        .then((res) => {
					if (res.data.code === 1) {
                let result = res.data.data;
            for(var i =0;i<result.length;i++){
              let article = {
          id:'',
          title:'',
          keword:'',
          creattime:''
        };
            article.id = result[i].id;
            article.title = result[i].title;
            article.keyword = result[i].keyword;
            article.creattime = result[i].creattime.substr(0,10);
            self.articlelist.push(article);
                }        
            }
        }).then(function(error){
            console.log(error);
        })
    }
    },
    mounted(){
        this.getArticleList();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
a {
    text-decoration: none;
  }
   .router-link-active {
    text-decoration: none;
  }
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
