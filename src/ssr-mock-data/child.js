const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })
let len = process.argv.length;
const fs = require('fs');
const path = require('path');

const item = {
    href:process.argv[len-2],
    id: process.argv[len - 1],
}

async function run() {
   return await nightmare
        .goto(item.href)
        .evaluate(() => {
            var data = document.querySelector('.article-content').innerHTML;
            return data;
        })
        .end()
        .then(res => {
            fs.writeFile(path.resolve('./db/' + item.id + '.html'), res, (error) => {
                if (!error) {
                    console.log(item.id, 'is ok ');
                } else {
                    console.log(error);
                }
            });
            return res;
       }).catch(error => {
           console.error('get :', error)
       });

}

run();