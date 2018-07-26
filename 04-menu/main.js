const { app, BrowserWindow } = require('electron');
const path = require('path');
const debug = /--debug/.test(process.argv[2])

let mainWindow;
const { setMainMenu } = require('./main-menu');

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false
  });
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools();
      mainWindow.maximize();
      require('devtron').install();
    }
    console.log('start work main pid = ', process.pid);
  });
  setMainMenu();
});
