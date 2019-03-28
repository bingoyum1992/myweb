// sign in:
const userModel = require('../models/index.js');
var signin = async (ctx, next) => {
    let
        name = ctx.request.body.name,
        password = ctx.request.body.password;
    await userModel.findUser(name)
        .then(result =>{
            let res = result;
            console.log(res);
            if(res.length === 0){
                ctx.body = {
                    code:-1,
                    data:res
                }
            }
            else if(name === res[0]['swry_dm']&&password === res[0]['password']){
                console.log(`${name}login success!`);
                ctx.body = {
                    code:1,
                    data:res
                }
            }else{
                ctx.body = {
                    code:0,
                    data:res
                }
            }
        }).catch(err=>{
            console.log(err);
        });
}
var gdzc = async(ctx,next)=>{
    ctx.render('success.html')
}
module.exports = {
    'POST /user/login': signin,
    'GET /gdzc': gdzc
};
