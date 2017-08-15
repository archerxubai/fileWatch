const watch = require('node-watch')
const fs = require('fs')

const { log } = require('../utils')

const ensureExists = (path) => {
    if (!fs.existsSync(path)) {
        const data = '[]'
        fs.writeFileSync(path, data)
    }
}

const save = (data, path) => {
    const s = JSON.stringify(data, null, 2)
    fs.writeFileSync(path, s)
}

const load = (path) => {
    const options = {
        encoding: 'utf8',
    }
    ensureExists(path)
    const s = fs.readFileSync(path, options)
    const data = JSON.parse(s)
    return data
}

let pictures = []

// 返回文件夹中的文件名
const filesIn = (path) => {
    let files = fs.readdirSync(path)
    return files
}



let newFiles = []
let filesUpload = load('./express_server/db/filesUpload.txt')

// 监视文件夹，如果有新的文件加入，若不在已filesUpload中，则加入newFiles列表。
const dirWatch = (path) => {
    watch(path, (event, name) => {
        if (event == 'update') {
            let files = filesIn(path)
            files.map((f) => {
                if (!filesUpload.includes(f)) {
                    newFiles.push(f)
                }
            })
        }
        log('newFiles', newFiles)
        log('filesUpload', filesUpload)
    })
}

const upload = (filePath, serverPath ) => {
    const net = require('net')

// 设置连接服务器的信息
    const host = '115.182.201.8'
    const port = 80

// 创建一个客户端, 可以连接到服务器
    const client = new net.Socket()

// 客户端根据给出的配置参数打开一个连接, 这样可以连接到服务器
    client.connect(port, host, () => {
        console.log('connect to: ', host, port)

        // 向服务器发送一个消息
        const request = 'data from client'
        client.write(request)

        // 如果 server destroy 之后, 再调用下面的代码会报错
        // setInterval(() => {
        //     client.write('hello in interval')
        // }, 100)
    })

// 当接收服务器的响应数据时触发 data 事件
    client.on('data', (d) => {
        // 参数是 d, 默认情况下是 buffer 类型
        // 可以用 d.toString() 将 buffer 转成字符串
        console.log('data:', d, d.toString())

        // 完全关闭 client 的连接, 套路写法
        client.destroy()
    })

// client 关闭的时候触发这个事件
    client.on('close', function () {
        console.log('connection closes')
    })
}

const test = () =>{
    log(newFiles)
}

const _main = () =>{

}

module.exports = {
    filesIn: filesIn
}
