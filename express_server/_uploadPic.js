/**
 * Created by hasee on 2017/8/22.
 */
const log = console.log.bind(console)

// 'http://127.0.0.1:4000/picture/upload'
const uploadPic = function (url, file) {
    let FormData = require('form-data');
    let fs = require('fs');

    let form = new FormData();
    form.append('file', fs.createReadStream(file))

    form.submit(url, function (err, response) {
        if (err) {
            log('upload failed:', err);
        } else {
            log('Upload successful!  Server responded with:', response.statusCode);
            response.resume()
        }
    })
}

const upload = function (dir) {

}





