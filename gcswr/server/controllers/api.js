// sign in:
const userModel = require('../models/index.js');
var getRkxx = async (ctx, next) => {
    /* let
        name = ctx.request.body.name; */
    await userModel.findALlRkxx()
        .then(result =>{
            let res = result;
            console.log(res);
            if(res.length === 0 ){
                ctx.body = "null";
            }else{
                ctx.body = res;
            }
        }).catch(err=>{
            console.log(err);
        });
}
var getArticleList = async (ctx, next) => {
    /* let
        name = ctx.request.body.name; */
    await userModel.getArticleList()
        .then(result =>{
            let res = result;
            console.log(res);
            if(res.length === 0 ){
                ctx.body = {
                    code:-1
                }
            }else{
                ctx.body = {
                    code:1,
                    data:res
                }
            }
        }).catch(err=>{
            console.log(err);
        });
}
var getArticleById = async (ctx, next) => {
    let title = ctx.request.body["id"];
    await userModel.getArticleById(id)
        .then(result =>{
            let res = result;
            console.log(res);
            if(res.length === 0 ){
                ctx.body = {code:-1};
            }else{
                ctx.body = {code:1,
                data:res}
            }
        }).catch(err=>{
            console.log(err);
        });
}
var addArticle = async (ctx, next) => {
    /* let
        name = ctx.request.body.name; */
        console.log(ctx.request.body);
        console.log(ctx.request.body["rkbh"]);
        let title = ctx.request.body["title"],
        keyword = ctx.request.body["keyword"],
        content = ctx.request.body["content"],
        insertname = ctx.request.body["username"]
    await userModel.addArticle([title,keyword,content,insertname])
        .then(result =>{
            let res = result;
            console.log(res);    
            if(res.length === 0 ){
                ctx.body = {
                    code:-1,
                    data:res
                }
            }else{
                ctx.body = {
                    code:1
                };
            }
        }).catch(err=>{
            console.log(err);
        });
}
var insertCkxx = async (ctx, next) => {
    /* let
        name = ctx.request.body.name; */
        console.log(ctx.request.body);
        console.log(ctx.request.body["rkbh"]);
        let rkbh = ctx.request.body["rkbh"],
        lb = ctx.request.body["lb"],
        pp = ctx.request.body["pp"],
        xh = ctx.request.body["xh"],
        sl = ctx.request.body["sl"],
        lybm =ctx.request.body["lybm"],
        lyr = ctx.request.body["lyr"],
        lyrq = ctx.request.body["lyrq"],
        ckr = ctx.request.body["ckr"];
    await userModel.insertCkxx([rkbh,lb,pp,xh,sl,lybm,lyr,lyrq,ckr])
        .then(result =>{
            let res = result;
            console.log(res);
            if(res.length === 0 ){
                ctx.body = "null";
            }else{
                ctx.body = res;
            }
        }).catch(err=>{
            console.log(err);
        });
}
module.exports = {
    /* 'GET /api/getRkxx': getRkxx, */
   /*  'GET /api/getCkxx': getCkxx, */
    'GET /api/getArticleList': getArticleList,
    'GET /api/getArticleById': getArticleById,
    'POST /api/addArticle':addArticle,
    'POST /api/insertCkxx':insertCkxx/*
    'POST /api/updateRkxx':insertRkxx,
    'POST /api/updateCkxx':insertCkxx */
};
