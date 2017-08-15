/**
 * Created by hasee on 2017/8/16.
 */
"use strict"


const request = require('request')
const fs = require('fs')
const {log} = require('../utils')

const downloadPic = function(fileName) {
    let url = 'http://127.0.0.1:4000/picture/download/' + fileName
    const f = fileName.split('.')[0] + '.jpg'
    const path = './download/' + f
    request(url).pipe(fs.createWriteStream(path))
}

const downloadAllPic = (url) => {
    request(url, function (error, response, body) {
        let data = JSON.parse(body)
        for (let i = 0; i < data.length; i++){
            let fileName = data[i]
            downloadPic(fileName)
        }
    })
}

const _main = () => {
    let url = 'http://127.0.0.1:4000/picture/all'
    downloadAllPic(url)
}

// _main()