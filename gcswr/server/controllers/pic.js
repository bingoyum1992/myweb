var addPic = async (ctx, next) => {
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
    'POST /api/pic/add':addPic,
};
