/**
 * Created by hasee on 2017/8/20.
 */
const e = selector => document.querySelector(selector)
const config = {
    save_path:'',

}

const bindEvents = function () {
    let buttonSavePath = e('#id-button-save-path')
    const fs = require('fs')

    buttonSavePath.addEventListener('click', function (event) {
        let input = e('#id-input-save')
        let path = input.value
        log('path', path)
        fs.stat(path, function (err, stat) {
            if (err == null) {
                if (stat.isDirectory()) {
                    log('path is exist')
                    alert('path is exist')
                    config.save_path = path
                }
            } else {
                log('文件夹不存在')
                alert('文件夹不存在')
            }
        })

})
}

bindEvents()
