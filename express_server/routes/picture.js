/**
 * Created by hasee on 2017/7/21.
 */
const express = require('express')
const { config } = require('../config')
const {filesIn} = require('../dirWatch')
const multer = require('multer')
const { log } = require('../../utils')
const path = require('path')

uploadFolder = 'uploads/'

picturePath = path.normalize(config.pictureDir)

// 配置 multer 模块
// dest 表示文件上传之后保存的路径
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, Date.now() + '-' +  file.originalname);
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

const picture = express.Router()

picture.get('/download/:filename', (request, response) => {
    log('get picture')
    const path = require('path')
    // 头像所在的路径, 我们配置的时候使用的是相对路径
    const filename = request.params.filename
    const p = picturePath + filename
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
    let files = filesIn(picturePath)
    log('files', files)
    response.send(files)
})

// 用户上传头像的路由, 这里会依次调用三个处理函数
picture.post('/upload', upload.single('file'),(request, response) => {
    // upload.single 获取上传的单个文件并且处理
    // request.file 是处理之后的信息
    log('debug request file', request.file)
    // const u = currentUser(request)
    const avatar = request.file
    // log('fileName', avatar.filename)
    // filename 是保存在 dest 中的文件名,
    // 这里我们不使用用户上传的文件名, 直接用 multer 处理之后的名字
    // 因为用户上传的文件名从安全角度来看是有风险的
    // >> bash_profile
    response.send('upload finished')
})

module.exports = picture