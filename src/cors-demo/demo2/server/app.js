/**
 * 服务入口
 */
var http = require('http');
var koaStatic = require('koa-static');
var path = require('path');
var koaBody = require('koa-body');
var Koa = require('koa2');


var app = new Koa();
var port = process.env.PORT || '8100';

var uploadHost= `http://localhost:${port}/uploads/`;

app.use(koaBody());

app.use(koaStatic(
    path.resolve(__dirname, '../static')
));

app.use((ctx,next)=>{

    console.log('set cookie');
    ctx.cookies.set('bigerfe-cookie', 'zz-jesse3', {
        maxAge: 1000000
    });
    return next();
})


//跨域处理
app.use((ctx) => {
  

    //指定一个接口和返回数据
    var path =ctx.path;
    if(path==='/getdata'){

        console.log('receive req');

        //服务端通过 ctx.headers.origin 获取请求中的origin
        ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
        ctx.set('Access-Control-Allow-Credentials',true);

        ctx.body=JSON.stringify({
            code:0,
            msg:'success',
            data:[]
        });
    }else{
        ctx.body='welcome';
    }

})


/**
 * Create HTTP server.
 */
var server = http.createServer(app.callback());
server.listen(port);
console.log('cors demo2 server start ......   ');