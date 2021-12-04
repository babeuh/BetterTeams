const { ipcMain, ipcRenderer } = require("electron");

const send = (eventId) => {
  return ipcRenderer.sendSync(eventId);
};

const on = (eventId, returnValue) => {
  ipcMain.on(eventId, (event) => {
    event.returnValue = returnValue;
  });
};

module.exports = {send, on}