/****************
BetterTeams Stuff
****************/

//Dependencies
const { join } = require("path");
const ipc = require("../outlet/transport/ipc");
const ThemeManager = require("../outlet/managers/themeManager");
const EnabledFileManager = require("../outlet/managers/enabledFileManager");
const InjectorManager = require("../outlet/managers/injectorManager");
const PluginManager = require("../outlet/managers/pluginManager");
const setupSettingsUI = require("../ui/settings");

//Code
console.log("Loading BetterTeams...");

/***************************
Wait until injector is ready
****************************/
const wuir = (callback) => {
  let isReady = window.angular.element("html").injector() !== undefined;
  if (isReady) {
    callback();
  } else {
    setTimeout(() => {
      wuir(callback);
    }, 50);
  }
};

const init = () => {
  const dataFolderPath = join(__dirname, "../../data");

  const enabledFileManager = new EnabledFileManager({
    dataFolderPath,
  });

  const themeManager = new ThemeManager({
    dataFolderPath,
    enabledFileManager,
  });
  global.tm = themeManager;

  wuir(() => {
    const injectorManager = new InjectorManager();

    const pluginManager = new PluginManager({
      dataFolderPath,
      injectorManager,
      enabledFileManager,
    });
    global.pm = pluginManager;

    setupSettingsUI();
    console.log("Loaded BetterTeams");
  });
};

/****************
  Teams Preload
****************/
const teams_prepath = ipc.send("BETTERTEAMS_INTERNAL_GET_ORIG_PRELOAD_PATH");
require(teams_prepath);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
