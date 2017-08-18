/**
 * Created by hasee on 2017/8/16.
 */
// "use strict"


// const request = require('request')
// const fs = require('fs')
// const {log} = require('../utils')
//
// const downloadPic = function(fileName) {
//     let url = 'http://127.0.0.1:4000/picture/download/' + fileName
//     const f = fileName.split('.')[0] + '.jpg'
//     const path = './download/' + f
//     request(url).pipe(fs.createWriteStream(path))
// }
//
// const downloadAllPic = (url) => {
//     request(url, function (error, response, body) {
//         let data = JSON.parse(body)
//         for (let i = 0; i < data.length; i++){
//             let fileName = data[i]
//             downloadPic(fileName)
//         }
//     })
// }
//
// const _main = () => {
//     let url = 'http://127.0.0.1:4000/picture/all'
//     downloadAllPic(url)
// }

// _main()


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

// setInterval(function () {
//     refreshPic()
// }, 1000)
