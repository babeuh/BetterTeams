const { BrowserWindow } = require("electron");
const { join } = require("path");
const { setInternalData } = require("../cable");

module.exports = class PatchedBrowserWindow extends BrowserWindow {
  constructor(opts) {
    //Detect Main window
    const isMainWindow = opts.webPreferences.additionalArguments.includes(
      "--msteams-process-type=mainWindow"
    );

    if (isMainWindow) {
      setInternalData({ original_preload_path: opts.webPreferences.preload });
      
      opts.webPreferences.preload = join(__dirname, "preload.js");
      opts.webPreferences.sandbox = false;

      const browser_window = new BrowserWindow(opts);

      browser_window.webContents.on("before-input-event", (event, input) => {
        if (input.control && input.shift && input.key.toLowerCase() === "i") {
          browser_window.webContents.toggleDevTools();
          event.preventDefault();
        }
      });
      browser_window.webContents.on("did-finish-load", () => {
        browser_window.webContents.executeJavaScript(
          'if (angular.element("head").scope() == undefined) {angular.reloadWithDebugInfo()}'
        );
      });

      return browser_window;
    } else {
      const win = new BrowserWindow(opts);
      return win;
    }
  }
} 
