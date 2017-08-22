/**
 * Created by hasee on 2017/8/22.
 */
const log = console.log.bind(console)
var fs = require('fs');
const request = require('request')


var FormData = require('form-data');
var fs = require('fs');

var form = new FormData();
form.append('file', fs.createReadStream(__dirname + '/test.jpg'))


form.submit('http://127.0.0.1:4000/picture/upload', function (err, response) {
    if (err) {
        log('upload failed:', err);
    } else {
        log('Upload successful!  Server responded with:', response.statusCode);
        response.resume()
    }


})

