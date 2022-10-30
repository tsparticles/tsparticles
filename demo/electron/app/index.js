const path = require('path');
const {app, BrowserWindow} = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('client/index.html');
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (!BrowserWindow.getAllWindows().length) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
