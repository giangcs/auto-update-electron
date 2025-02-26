const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Use preload.js to expose IPC safely
            nodeIntegration: false,  // Make sure this is false
            contextIsolation: true   // Make sure this is true for security
        }
    });
    win.webContents.openDevTools()

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('data', (event, arg) => {
    console.log(arg);  // Receives data from renderer
    event.reply('reply', 'Hello from main process');
});
