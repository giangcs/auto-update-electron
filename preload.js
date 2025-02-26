const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    sendData: (data) => ipcRenderer.send('data', data),
    onReply: (callback) => ipcRenderer.on('reply', callback)
});
