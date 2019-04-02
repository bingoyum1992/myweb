// sign in:
const userModel = require('../models/index.js');
var login = async (ctx, next) => {
    let
        name = ctx.request.body.name,
        password = ctx.request.body.password;
    await userModel.getUserData(name)
        .then(result =>{
            let res = result;
            console.log(res);
            if(res.length === 0){
                ctx.body = {
                    code:-1,
                    data:res
                }
            }
            else if(name === res[0]['name']&&password === res[0]['password']){
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
var getUserData = async (ctx, next) => {
    let
        name = ctx.request.body.name;
        console.log(name);
    await userModel.getUserData(name)
        .then(result =>{
            let res = result;
            console.log(res);
            if(res.length === 0){
                ctx.body = {
                    code:-1,
                    data:res
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
module.exports = {
    'POST /user/login': login,
    'POST /user/getUserData':getUserData
};
