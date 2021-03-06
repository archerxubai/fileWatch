const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const session = require('cookie-session')

const fs = require('fs')

const {log} = require('../utils')
const { secretKey } = require('./config')

// 先初始化一个 express 实例
const app = express()

// 设置 bodyParser
app.use(bodyParser.urlencoded({
    extended: true,
}))

// 配置 nunjucks 模板, 第一个参数是模板文件的路径
nunjucks.configure('templates', {
    autoescape: true,
    express: app,
})

// messageList 用来存储所有的 message
const messageList = []

const picture = require('./routes/picture')

app.use('/picture', picture)

// 定义路由和路由处理函数的方式如下
// 用 app.METHODS 的方式定义请求
// METHODS 只接受 get/post/delete/update 方法（当然我们使用 get 和 post 就可以了）
// 第一个参数是 path, 第二个参数是一个回调函数, 这个回调函数是用来处理请求的
// 比如这个就是处理 path 为 / 的 get 请求
app.get('/', (request, response) => {
    // response.send 发送的是 response 的内容
    // 相当于我们用的 socket.write 方法
    log('route /')
    response.send('Hello Gua')
})

// 这是访问 /message 的请求
// method 是 get
app.get('/message', (request, response) => {
    // 打印请求的方法 GET 或者 POST
    log('请求方法', request.method)

    // request.query 是 express 保存 URL 中的参数的属性
    // 访问 http://127.0.0.1:2000/message?msg=hello
    // 会打印出对象格式的数据
    /*
    {
        msg: 'hello'
    }
    */
    log('request, query 参数', request.query)
    // response.render 会渲染一个模板文件, 因为前面已经设置了模板文件的路径
    // 所以实际上会去找 templates/message_index.html 文件
    // 第二个参数是一个对象, 会把模板里的 messages 变量替换成 messageList 的值
    response.render('message_index.html', {
        messages: messageList,
    })
})

// 这个路由函数只支持 post 方法, path 为 /message/add
app.post('/message/add', (request, response) => {
    // 打印请求的方法 GET 或者 POST
    log('message_add 请求方法', request.method)

    // request.body 是 express 中保存 POST 请求的表单数据的属性
    // 默认是 undefined
    // 需要安装 bodyParser 或者其他中间件才能获取正确的数据
    log('request, POST 的 form 表单数据', request.body)
    // 把数据生成一个 dict 存到 message_list 中去
    const msg = {
        content: request.body.msg_post || '',
    }
    messageList.push(msg)
    // 使用 response.redirect 函数来重定向, 这个和我们写过的函数是一样的
    response.redirect('/message')
})

// 把逻辑放在单独的函数中, 这样可以方便地调用
// 指定了默认的 host 和 port, 因为用的是默认参数, 当然可以在调用的时候传其他的值
const run = (port=3000, host='') => {
    // app.listen 方法返回一个 http.Server 对象, 这样使用更方便
    // 实际上这个东西的底层是我们以前写的 net.Server 对象
    const server = app.listen(port, host, () => {
        // 非常熟悉的方法
        const address = server.address()
        host = address.address
        port = address.port
        log(`listening server at http://${host}:${port}`)
    })
}

if (require.main === module) {
    const port = 8080
    // host 参数指定为 '0.0.0.0' 可以让别的机器访问你的代码
    const host = '0.0.0.0'
    run(port, host)
}

module.exports = {
    run: run,
}