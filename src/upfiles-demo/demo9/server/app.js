/**
 * 服务入口
 */
var http = require('http');
var koaStatic = require('koa-static');
var path = require('path');
var koaBody = require('koa-body');
var fs = require('fs');
var Koa = require('koa2');


var app = new Koa();
var port = process.env.PORT || '8100';

var uploadHost= `http://localhost:${port}/uploads/`;

app.use(koaBody({
    formidable: {
        //设置文件的默认保存目录，不设置则保存在系统临时目录下  
        uploadDir: path.resolve(__dirname, '../static/uploads')
    },
    multipart: true // 支持文件上传
}));

app.use(koaStatic(
    path.resolve(__dirname, '../static')
));

//二次处理文件，修改名称
app.use((ctx) => {
    console.log(ctx.request.files);
    
    var files = ctx.request.files ? ctx.request.files.f1:[];//得到上传文件的数组
    var result=[];
    console.log(files);

    if(!Array.isArray(files)){//单文件上传容错
        files=[files];
    }

    files && files.forEach(item=>{
        var path = item.path.replace(/\\/g, '/');
        var fname = item.name;//原文件名称
        var nextPath = path + fname;
        if (item.size > 0 && path) {
            //得到扩展名
            var extArr = fname.split('.');
            var ext = extArr[extArr.length - 1];
            var nextPath = path + '.' + ext;
            //重命名文件
            fs.renameSync(path, nextPath);

            result.push(uploadHost+ nextPath.slice(nextPath.lastIndexOf('/') + 1));
        }
    });

  
    ctx.body = `{
        "fileUrl":${JSON.stringify(result)}
    }`;
})




/**
 * Create HTTP server.
 */
var server = http.createServer(app.callback());
server.listen(port);
console.log('demo9 server start ......   ');