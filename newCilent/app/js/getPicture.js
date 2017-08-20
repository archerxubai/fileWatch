/**
 * Created by hasee on 2017/8/16.
 */

const log = console.log.bind(console)

var request = require('request')
var fs = require('fs')
const path = require('path')

var downloadPic = function(fileName) {
    var u = 'http://127.0.0.1:4000/picture/download/' + fileName
    var f = fileName.split('.')[0] + '.jpg'
    var p = path.normalize(path.join(config.save_path, f))
    //检查文件夹中是否存在图片
    fs.stat(p, function (err, stat) {
        if (err == null) {
            if (stat.isFile()) {
                log('文件存在')
            }
        } else {
            log('文件不存在')
            log('save', p)
            request(u).pipe(fs.createWriteStream(p))
        }
    })

}

var downloadAllPic = function(url) {
    request(url, function (error, response, body) {
        log('body', body)
        log('error', error)
        var data = JSON.parse(body)
        for (var i = 0; i < data.length; i++){
            var fileName = data[i]
            downloadPic(fileName)
        }
    })
}

var refreshPic = function() {
    let ip = config.server_ip
    let param = '/picture/all'
    let url = ip + param
    downloadAllPic(url)
}

module.exports = refreshPic

const _main = function () {
    var url = 'http://127.0.0.1:4000/picture/all'
    downloadAllPic(url)

}

_main()





