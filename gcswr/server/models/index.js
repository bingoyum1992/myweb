const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const config = require(`${__dirname}/../config/config.json`)['dev']
const mysql = require('mysql');
var pool = mysql.createPool({
host:config.host,
user:config.username,
password:config.password,
database:config.database,
port:config.port,
});

let query = function(sql,values){
    return new Promise((resolve,reject) =>{
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
            }else{
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(rows);
                        console.log(rows);
                    }
                    connection.release();
                });
            }
        },insecureAuth=true);
    });
}
let user = `create table if not exists user(
    swry_dm not null primary key,
    password varchar(200)
)`
let gdzc_rkxx = `create table if not exists gdzc_rkxx(
    id int not null auto_increment primary key,
    rkbh varchar(200),
    lb varchar(200),
    pp varchar(200),
    xh varchar(200),
    sl int,
    dj int,
    cgr varchar(200),
    rkrq date,
    rkr varchar(200),
    kcwz varchar(200)
)`;
let gdzc_ckxx = `create table if not exists gdzc_ckxx(
    id int not null auto_increment primary key,
    rkbh varchar(200),
    lb varchar(200),
    pp varchar(200),
    xh varchar(200),
    sl int,
    lybm varchar(200),
    lyr varchar(200),
    lyrq date,
    ckr varchar(200)
)`
let createTable =  function(sql){
    return query(sql,[]);
}
createTable(gdzc_rkxx);
createTable(gdzc_ckxx);
let insertUser = function(value){
    let _sql = "insert into user set swry_dm=?,swryxm=?,password=?,yddh=?;";
    return query(_sql,value);
}
let findUser = function(name){
    let _sql = `select * from user where swry_dm='${name}'`;
    return query(_sql)
}
let insertLink = function(value){
    let _sql = `insert into link set url=?,name = ?;`;
    return query(_sql,value)
}
let findAllLink = function(){
    let _sql = `select * from link`;
    query(_sql);
}
let deleteLink = function(id){
    let _sql = `delete from link where uuid ="${id}"`;
    return query(_sql)
}
let findUsersByPage = function(page){
    let _sql = `select * from user limit ${(page-1)*10},10;`
    return query(_sql);
}
let findALlRkxx = function(){
    let _sql = `select id,rkbh,lb,pp,xh,sl,dj,sl*dj as zj,cgr,rkr,rkrq,kcwz from gdzc_rkxx`;
    return query(_sql);
}
let findALlCkxx = function(){
    let _sql = `select * from gdzc_ckxx`;
    return query(_sql);
}
let findAllKcxx = function(){
    let _sql = `SELECT a.rkbh AS rkbh,a.lb AS lb,a.pp AS pp,a.xh AS xh,sum( a.sl ) AS rkzs,ifnull( b.zs, 0 ) AS ckzs,(sum( a.sl ) - ifnull( b.zs, 0 ) ) AS dqkc FROM gdzc_rkxx a 
    LEFT JOIN (SELECT rkbh,lb,pp,xh,sum( c.sl ) AS zs FROM gdzc_ckxx c GROUP BY c.rkbh,c.lb,c.pp,c.xh ) AS b ON a.rkbh = b.rkbh AND a.lb = b.lb AND a.pp = b.pp AND a.xh = b.xh GROUP BY 1,2,3,4`;
    return query(_sql);
}
let insertRkxx = function(value){
    let _sql = `insert into gdzc_rkxx(rkbh,lb,pp,xh,sl,dj,cgr,rkrq,rkr,kcwz) values(?,?,?,?,?,?,?,?,?,?)`;
    return query(_sql,value);
}
let insertCkxx = function(value){
    let _sql = `insert into gdzc_ckxx(rkbh,lb,pp,xh,sl,lybm,lyr,lyrq,ckr) values(?,?,?,?,?,?,?,?,?)`;
    return query(_sql,value);
}
module.exports = {
    query,
    insertUser,
    insertLink,
    findUser,
    findUsersByPage,
    deleteLink,
    findAllLink,
    findALlRkxx,
    findALlCkxx,
    findAllKcxx,
    insertRkxx,
    insertCkxx,
    query:query
}