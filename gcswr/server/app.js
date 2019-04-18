const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

//const templating = require('./templating');

const rest = require('./rest');
const Router=require('koa-router')
const app = new Koa();
const router = new Router();
const isProduction = process.env.NODE_ENV === 'production';
const multer = require('koa-multer');//加载koa-multer模块
//文件上传
//配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({ storage: storage });
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

// parse request body:
/* app.use(bodyParser.urlencodedParser({extended:false}));
app.use(bodyParser.json()); */
app.use(bodyParser());


//add nunjucks as view
/* app.use(templating('views', { 
       noCache: !isProduction, 
       watch: !isProduction
}));  */

// bind .rest() for ctx:
//app.use(rest.restify());

// add controllers:
app.use(controller());
router.post('/api/pic/add',upload.single('image'),async(ctx,next)=>{
    console.log('abc')
    ctx.body = {
      filename: ctx.req.file.filename//返回文件名
    }
  });
app.use(router.routes(), router.allowedMethods())

app.listen(8081);
console.log('app started at port 3000...');
