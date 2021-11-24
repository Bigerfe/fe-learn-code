//github https://github.com/marak/Faker.js/
var faker = require('faker');
faker.locale = "zh_CN"; //设置语言

function getUserItem(){
  return {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    website: faker.internet.url(),
    address: faker.address.streetAddress() + faker.address.city() + faker.address.country(),
    bio: faker.lorem.sentences(),
    image: faker.image.avatar()
  }
}

console.log(getUserItem());

// 获取列表
function getUserList(){
  const arr = [];
  let i=0;
  while(i<20){
    arr.push(getUserItem())
    i+=1;
  }
  return arr;
}

module.exports = getUserList;