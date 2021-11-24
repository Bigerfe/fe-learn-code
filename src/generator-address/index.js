// github https://github.com/moonrailgun/chinese-address-generator
const generator = require('chinese-address-generator/generator4');
let i=1;
while (i<100) {
  const address = generator.fabricateFullAddress(); // => {region: "上海", code: "310000"}
  console.log(address);
  i+=1;
}

