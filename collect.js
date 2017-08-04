/**
 * Created by hasee on 2017/7/20.
 */
const fs = require('fs');

const watchDir = (path, callback) => {
    let dirPath = path
    fs.watch(dirPath, callback)
}

