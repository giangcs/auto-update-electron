const {app, BrowserWindow} = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

const log = require("electron-log");

log.transports.file.resolvePath = () => path.join('C:/Users/63200557/Documents/auto-update-electron', 'logs/main.log');

log.info('Hello, log');
log.warn('Some problem appears')

let win;
function createWindow() {
    win =  new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile(path.join(__dirname, "index.html"))
}


app.on("ready", () => {
  createWindow()
});

app.on('ready', ()=>{
    createWindow()
    autoUpdater.checkForUpdatesAndNotify()
})

autoUpdater.on("update-available", () => {
    log.info("Update available")
});
autoUpdater.on("update-not-available", () => {
    log.info("Update not available")
});

autoUpdater.on("checking-for-update", () => {
    log.info("Checking for update")
});
autoUpdater.on("download-progress", () => {
    log.info("Download Progress")
});
autoUpdater.on("update-downloaded", () => {
    log.info("Update Downloaded")
});
autoUpdater.on("error", (err) => {
    log.info("Error in auto-updater" + err)
});

autoUpdater.on("download-progress", (progressTrack) => {
    log.info("\n\ndownload-progress")
    log.info(progressTrack)
})