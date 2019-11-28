var ffmpeg = require('fluent-ffmpeg');

function convert() {
    ffmpeg('src/video.webm')
        .videoCodec('libx264')
        .audioCodec('libmp3lame')
        .size('320x240')
        .on('error', function (err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('end', function () {
            console.log('Processing finished !');
        })
        .save('converted-video.mp4');
}

//convert();
