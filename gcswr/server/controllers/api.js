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
var getCkxx = async (ctx, next) => {
    /* let
        name = ctx.request.body.name; */
    await userModel.findALlCkxx()
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
var getKcxx = async (ctx, next) => {
    /* let
        name = ctx.request.body.name; */
    await userModel.findAllKcxx()
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
var insertRkxx = async (ctx, next) => {
    /* let
        name = ctx.request.body.name; */
        console.log(ctx.request.body);
        console.log(ctx.request.body["rkbh"]);
        let rkbh = ctx.request.body["rkbh"],
        lb = ctx.request.body["lb"],
        pp = ctx.request.body["pp"],
        xh = ctx.request.body["xh"],
        sl = ctx.request.body["sl"],
        dj = ctx.request.body["dj"],
        cgr = ctx.request.body["cgr"],
        rkrq =ctx.request.body["rkrq"],
        rkr = ctx.request.body["rkr"],
        kcwz = ctx.request.body["kcwz"];
    await userModel.insertRkxx([rkbh,lb,pp,xh,sl,dj,cgr,rkrq,rkr,kcwz])
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
    'GET /api/getRkxx': getRkxx,
    'GET /api/getCkxx': getCkxx,
    'GET /api/getKcxx': getKcxx,
    'POST /api/insertRkxx':insertRkxx,
    'POST /api/insertCkxx':insertCkxx/*
    'POST /api/updateRkxx':insertRkxx,
    'POST /api/updateCkxx':insertCkxx */

};
