/**
 * 服务入口
 */
var http = require('http');
var koaStatic = require('koa-static');
var path = require('path');
var koaBody = require('koa-body');
var Koa = require('koa2');
var getUserList = require('./data');

var app = new Koa();
var port = process.env.PORT || '8100';

app.use(koaBody());

//跨域处理
app.use((ctx) => {
    
    //ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);

    //指定一个接口和返回数据
    var path =ctx.path;
    if(path === '/userlist'){
        ctx.body=JSON.stringify({
            code:0,
            msg:'success',
            data:getUserList(),
        });
    }else{
        ctx.body='welcome';
    }
});

/**
 * Create HTTP server.
 */
var server = http.createServer(app.callback());
server.listen(port);
console.log(`server start at port: ${port} ......   `);