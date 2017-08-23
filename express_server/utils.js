/**
 * Created by hasee on 2017/8/23.
 */



const ensureExists = (path) => {
    const fs = require('fs')
    if (!fs.existsSync(path)) {
        const data = '[]'
        fs.writeFileSync(path, data)
    }
}

const save = (data, path) => {
    const fs = require('fs')
    const s = JSON.stringify(data, null, 2)
    fs.writeFileSync(path, s)
}

const load = (path) => {
    const fs = require('fs')
    const options = {
        encoding: 'utf8',
    }
    ensureExists(path)
    const s = fs.readFileSync(path, options)
    const data = JSON.parse(s)
    return data
}

module.exports = {
    save: save,
    load: load,
}