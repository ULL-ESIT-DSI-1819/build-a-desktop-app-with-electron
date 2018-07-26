const util = require("util");
const ins = (x) => util.inspect(x, {depth: null});

// See https://electronjs.org/docs/api/menu
const { app, Menu } = require('electron');

const isWindows = process.platform === 'win32';

module.exports = {
  setMainMenu
};

function setMainMenu() {
  const template = [
    {
      label: isWindows ? 'File' : app.getName(),
      submenu: [
        {
          label: isWindows ? 'Exit' : `Quit ${app.getName()}`,
          accelerator: isWindows ? null : 'CmdOrCtrl+Q',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' }, //just adds a line visually
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    }
  ];
  console.log(ins(template));
  // Generally, the template is just an array of options for constructing a MenuItem.
  const menu = Menu.buildFromTemplate(template);
  console.log(ins(menu));
  // Sets menu as the application menu on macOS. On Windows and Linux, the menu
  // will be set as each window's top menu.
  Menu.setApplicationMenu(menu);
}
