/**
 * Created by hasee on 2017/7/15.
 */
'use strict'

function QRcodePNG64(text) {
    const qr = require('qr-image');
    let url = text
    let QRcode_string = qr.imageSync(url, {type: 'png'});
    console.log('QRcode_string', QRcode_string)
    return QRcode_string.toString('base64')
}


let button = document.getElementById('button-qr-code')
let img = document.getElementById('img-qr')


function currentImgName() {
    let currentImg = document.getElementById('currentImage')
    let src = currentImg.src
    //get img name from src

    return imgName
}

function imgUrl(imgName) {
    let protocl = 'https'
    let website = ''
    let path = ''
    let url = `${protocl}://${website}/${path}/${imgName}`
    return url

}

button.addEventListener('click', function () {
    let url = 'https://www.baidu.com'
    let QR = QRcodePNG64(url)
    let dataUri = `data:image/svg;base64,${QR}`
    img.src = dataUri
})