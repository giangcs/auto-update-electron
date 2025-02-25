const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");
let win;
function createWindow() {
    win =  new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.webContents.openDevTools()
    win.loadFile(path.join(__dirname, "index.html"))
}


app.on("ready", () => {
  createWindow()
});
app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})

ipcMain.on('hello', async (e, arg) => {
    console.log(arg);
    e.reply('replay', 'this is frpom server side')
})
