
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

const {ipcMain} = require('electron')
// var ipc = require('ipc');

ipcMain.on('close-main-window', function () {
    app.quit();
});

ipcMain.on('image-changed', function(sender, fileName) {
	//console.log('on image-changed  with ' + JSON.stringify(arguments));
	mainWindow.setTitle(fileName);
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        //frame: false,
        resizable: true,
        height: 600,
        width: 800
    });
    mainWindow.webContents.openDevTools()
    // mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
     mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/app/index.html'),
    protocol: 'file:',
    slashes: true
  }))
});

