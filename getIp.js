/**
 * Created by hasee on 2017/8/23.
 */
var os = require('os');

const log = console.log.bind(console)
    const e = sel => document.querySelector(sel)

    const templateOfTextara = function (text) {
        let t = `
          <span>${text}</span>
          <br>
        `
        return t
    }


function getLocalIps(flagIpv6) {
    var ifaces = os.networkInterfaces();
    var ips = [];
    var func = function (details) {
        if (!flagIpv6 && details.family === 'IPv6') {
            return;
        }
        ips.push(details.address);
    };
    for (var dev in ifaces) {
        ifaces[dev].forEach(func);
    }
    return ips;
};

const bindEvents = function () {
    let b = e('#id-button-ip')
    b.addEventListener('click', function () {
        let ipInfo = getLocalIps()
        log('ipInfo', ipInfo)
        let d = e('#id-div-ip_info')
        for (let i = 0; i < ipInfo.length; i++){
            let text = ipInfo[i]
             let html = templateOfTextara(text)
             d.insertAdjacentHTML('beforeend', html)
        }

    })
}

const __main = function () {
    bindEvents()
}
__main()


// console.log('本机ip地址(不包括Ipv6):', getLocalIps());
// console.log('本机ip地址(包括Ipv6):', getLocalIps(true));
