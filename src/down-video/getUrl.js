const request = require('request');
const downFn = require('./down')

let send = {
  'Error:': '查询失败',
  'code': 400,
}


function getApiUrl(url){
  //前端传过来的地址 进行重定向拿到 item_ids 并且返回
  return new Promise(resolve => {
    request(url, (error, response) => {
      if (!error && response.statusCode == 200) {
        let href = response.request.href;
        let id = '';
        id = href.match(/video\/(\S*)\/\?region/)[1];
        resolve(`https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${id}`);
      } else {
        resolve(false)
      }
    })
  });
}


let Videowm = async (url) => {

  url = httpString(url);
  console.warn(url)
  //前端传过来的地址 进行重定向拿到 item_ids 并且返回
  let watermark = await new Promise(resolve => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let href = response.request.href;
        console.log('href', href)
        let id = void 0;
        try {
          id = href.match(/video\/(\S*)\/\?region/)[1];
        } catch (error) {
          res.json(send)
          return false;
        }
        resolve(`https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${id}`);
      } else {
        res.json(send)
      }
    })
  });

  let url1 = await new Promise(resolve => {
    //拿到完整地址返回指定数据 
    request(watermark, async (error, response, body) => {
      if (!error && response.statusCode == 200) {

        let result = JSON.parse(body);
        let data = result.item_list[0];
        //视频url解析
        let video = data['video']["play_addr"]["url_list"][0]
        resolve(video)
      }else{
        resolve(false)
      }
    })
  })

  return videourl(url1).then(lastUrl=>{
    return lastUrl
  })
}

//解析视频
const videourl = async (url) => {
  //截取字符串 wm
  url = url.replace(/wm/g, '');
  return new Promise(resolve => {
    setTimeout(() => {
      request(url, (error, response, body) => {
        console.warn('response.request.href',response.request.href)
        console.log('121212',response.statusCode)
        resolve(response.request.href)
      })
    }, 2000);
  })
}

//解析字符串里面的url
const httpString = (s) => {
  let reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
  try {
    return s.match(reg)[0];
  } catch (error) {
    return null;
  }
}

// module.exports = {
//     Videowm
// }

Videowm('https://v.douyin.com/JooFw6N/').then(url=>{
  console.log('urlis',url)
  downFn.downVideo(url)
})

