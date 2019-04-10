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
    name varchar(200) not null primary key,
    password varchar(200),
    age int,
    sex int,
    phone varchar(100),
    intro varchar(200)
)`
let article = `CREATE TABLE if not exists article (id INT NOT NULL AUTO_INCREMENT,title VARCHAR(200) NOT NULL,keyword VARCHAR(200) NULL,content VARCHAR(20000) NULL,insertname VARCHAR(200) NULL, auditname VARCHAR(200) NULL, 
catagory VARCHAR(45) NOT NULL DEFAULT 0, creattime TIMESTAMP(5) NULL DEFAULT CURRENT_TIMESTAMP,  PRIMARY KEY (id)) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8`
let inituser = `insert into user(name,password,age,sex,phone,intro) value(
    '任斌','123456',26,1,'18184100612','信息中心瓦都是')`;
let createTable =  function(sql){
    return query(sql,[]);
}
createTable(user);

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
let getUserData = function(name){
    let _sql = `select * from user where name='${name}'`;
    return query(_sql)
}
let addArticle = function(value){
    let _sql = `insert into article (title,keyword,content,insertname) values(?,?,?,?)`;
    return query(_sql,value);
}
module.exports = {
    query,
    insertUser,
    insertLink,
    findUser,
    findUsersByPage,
    query:query,
    getUserData:getUserData,
    addArticle:addArticle
}