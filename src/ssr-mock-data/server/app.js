/**
 * 服务入口
 */
var http = require('http');
var koaStatic = require('koa-static');
var pathSys = require('path');
var koaBody = require('koa-body');
var fs = require('fs');
var Koa = require('koa2');


var app = new Koa();
var port = process.env.PORT || '8100';


app.use(koaBody({
}));

const list = require('../db/db.json');

app.use(async function (ctx) {
    const path = ctx.path;
    console.log(path);
    const data={
        code:0,
        data:{}
    }
    if(path==='/list'){
        data.data = list;
    } else if (path.indexOf('/detail/')>-1){
        let id = path.split('/')[2];
        if (fs.existsSync(pathSys.resolve('./db/'+id+'.html'))){
            data.html = fs.readFileSync(pathSys.resolve(`./db/${id}.html`)).toString();
        }
    }
    ctx.body = data;
   
});

/**
 * Create HTTP server.
 */
var server = http.createServer(app.callback());
server.listen(port);
console.log(' 8100 server start ......   ');