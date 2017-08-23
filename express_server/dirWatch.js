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
let filesUpload = load(__dirname + '/db/filesUpload.txt')

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

const uploadPic = function (url, file) {
    let FormData = require('form-data');
    let form = new FormData();
    form.append('file', fs.createReadStream(file))
    form.submit(url, function (err, response) {
        if (err) {
            log('upload failed:', err);
        } else {
            log('Upload successful!  Server responded with:', response.statusCode);
            response.resume()
        }
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
