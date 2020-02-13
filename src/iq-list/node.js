var ffmpeg = require('fluent-ffmpeg');

//new ffmpeg();

// ffmpeg('/Users/zhangjiapeng/666/mp4')
//     .output('aa.mp4')
//     .on('end', function () {
//         console.log('Finished processing');
//     })
//     .run();

ffmpeg('/Users/zhangjiapeng/666/mp4').output('aa.mp4').run();