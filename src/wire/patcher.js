const {_load} = require("module");
const { join, dirname } = require("path");
const electron = require("electron");

const PatchedBrowserWindow = require("./patchedBrowserWindow");

const electronPath = require.resolve("electron");
const teamsPath = join(dirname(require.main.filename), "..", "app.asar");
const teamsPackage = require(join(teamsPath, "package.json"));
const mainFileName = join(teamsPath, teamsPackage.main);

require.main.filename = mainFileName;

/************************
BetterTeams Modifications
************************/
console.log("BetterTeams: Starting");

console.log("BetterTeams: Patching electron exports");
const electronExports = new Proxy(electron, {
  get(target, prop) {
    switch (prop) {
      case "BrowserWindow":
        return PatchedBrowserWindow;
      default:
        return target[prop];
    }
  },
});

delete require.cache[electronPath].exports;
require.cache[electronPath].exports = electronExports;

console.log("BetterTeams: Removing CSP");
electron.app.once("ready", () => {
  electron.session.defaultSession.webRequest.onHeadersReceived(
    ({ responseHeaders }, done) => {
      Object.keys(responseHeaders)
        .filter((k) => /^content-security-policy/i.test(k))
        .map((k) => delete responseHeaders[k]);

      done({ responseHeaders });
    }
  );
});

console.log("BetterTeams: Blocking certain urls");
const blockList = [];
electron.app.on("ready", function () {
  electron.session.defaultSession.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      if (blockList.includes(details.url)) {
        console.log(`BetterTeams: Blocked url ${details.url}`);
        callback({
          cancel: true,
        });
      } else {
        callback({
          cancel: false,
          requestHeaders: details.requestHeaders,
        });
      }
    }
  );
});

console.log("BetterTeams: Overwriting electron name and path");
// @ts-ignore: setAppPath exists
electron.app.setAppPath(teamsPath);
electron.app.setName(teamsPackage.name);

console.log("BetterTeams: Done");
console.log("BetterTeams: Loading Teams");

_load(mainFileName, null, true);
