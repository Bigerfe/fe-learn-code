const path = require('path')
const fs = require('fs')
const request = require('request')
/**
 * 下载视频
 */
function downVideo(url) {

  var fileName = `${+new Date()}.mp4`
  var fullPath = path.resolve('./videos/' + fileName);

  console.log('开始下载视频：', fileName);

  //这个地方要详细说了
  request(encodeURI(url)).on('error', function (err) {
    console.warn(error)
  }).pipe(fs.createWriteStream(fullPath)).on('finish', () => {
    console.log('视频下载成功');
  })

}

const url = 'http://v26.douyinvod.com/1633e3a3a2d4afa5ba13427d06b1edf9/60332ca2/video/tos/cn/tos-cn-ve-15/04fcf0116d844e34974131acab1c0fe7/?a=1128&br=7060&bt=1765&cd=0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&l=202102220001380102121801332648776C&lr=&mime_type=video_mp4&pl=0&qs=0&rc=anJkcThvdjM6MzMzN2kzM0ApOWk3Njs0aDw0NzU0NzQ4O2cpaGRqbGRoaGRmcV5jcDJsLzVfYC0tNS0wc3MxM15gYDMvL18wYDZgNDQ0OmNwb2wrbStqdDo%3D&vl=&vr='
downVideo(url)

module.exports = {
  downVideo,
}