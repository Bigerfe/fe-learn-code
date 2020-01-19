const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })
const fs = require('fs');
const path = require('path');
const spwan = require('child_process').spawnSync;

async function run() {
    
let dt = await nightmare
    .goto('https://juejin.im/books')
    .evaluate(() => {

        var list = document.querySelectorAll('.list-wrap .item');
        var obj={},last=[];

        for(let item of list){
            
            last.push({
                title:item.querySelector('.title span').textContent,
                des:item.querySelector('.desc').textContent,
                pic: item.querySelector('.poster div').getAttribute('data-src'),
                href: 'https://juejin.im'+item.getAttribute('href'),
                id: item.getAttribute('href').split('/')[2]
            })
        }

        return last;

    })
    .end()
    .then((res)=>{
        fs.writeFile(path.resolve('./db/db.json'), JSON.stringify(res),(error)=>{
            if(!error)console.log('write ok');
        });

        return res;
    })
    .catch(error => {
        console.error('Search failed:', error)
    });



    //采集页面
   for (var i = 0; i < dt.length; i++) {
       var item = dt[i];
       spwan('node', ['./child.js', item.href, item.id], { stdio: 'inherit' });
    }
}


run();