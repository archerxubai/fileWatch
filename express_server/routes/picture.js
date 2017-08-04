/**
 * Created by hasee on 2017/7/21.
 */
const express = require('express')
const { uploadPath } = require('../config')
const {filesIn} = require('../dirWatch')

const { log } = require('../../utils')

const picture = express.Router()

picture.get('/download/:filename', (request, response) => {
    log('get picture')
    const path = require('path')
    // 头像所在的路径, 我们配置的时候使用的是相对路径
    const filename = request.params.filename
    const p = uploadPath + filename
    // response.sendFile 的参数是一个绝对路径
    // 使用 path.resolve 把头像的路径转换成绝对路径
    const absolutePath = path.resolve(p)
    // 实际上图片也是发一个请求, 我们最初的课程是按照 /static?file 的形式来处理的
    // 常见的验证码是一张图片, 处理方式也是这种
    // /captcha?random=45678
    // 点击图片的时候会换一张验证码, 实际上就是拿到前端传过来的随机数,
    // 然后生成一个新的随机数, 最后写入到图片中
    response.sendFile(absolutePath)
})

picture.get('/all', (request, response) => {
    log('get all')
    let files = filesIn('./uploads')
    log('files', files)
    response.send(files)
})

module.exports = picture