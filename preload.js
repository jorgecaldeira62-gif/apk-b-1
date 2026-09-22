const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        send: (channel, data) => {
            ipcRenderer.send(channel, data);
        },
        on: (channel, func) => {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        },
        once: (channel, func) => {
            ipcRenderer.once(channel, (event, ...args) => func(...args));
        },
        invoke: (channel, data) => {
            return ipcRenderer.invoke(channel, data);
        },
        removeListener: (channel, func) => {
            ipcRenderer.removeListener(channel, func);
        }
    },
    app: {
        getVersion: () => ipcRenderer.invoke('get-app-version'),
        getPath: () => ipcRenderer.invoke('get-app-path')
    }
});