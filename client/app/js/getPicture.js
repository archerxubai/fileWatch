/**
 * Created by hasee on 2017/8/16.
 */


var request = require('request')
var fs = require('fs')

var downloadPic = function(fileName) {
    var u = 'http://127.0.0.1:4000/picture/download/' + fileName
    var f = fileName.split('.')[0] + '.jpg'
    var path = './download/' + f
    request(u).pipe(fs.createWriteStream(path))
}

var downloadAllPic = function(url) {
    request(url, function (error, response, body) {
        var data = JSON.parse(body)
        for (var i = 0; i < data.length; i++){
            var fileName = data[i]
            downloadPic(fileName)
        }
    })
}

var refreshPic = function() {
    var url = 'http://127.0.0.1:4000/picture/all'
    downloadAllPic(url)
}

module.exports = refreshPic

