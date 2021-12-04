/****************
BetterTeams Stuff
****************/

//Dependencies
const { join } = require("path");
const ipc = require("../outlet/transport/ipc")
const ThemeManager = require("../outlet/managers/themeManager");
const EnabledFileManager = require("../outlet/managers/enabledFileManager");
const setupSettingsUI = require("../ui/settings");

//Code
console.log("Loading BetterTeams...");

const init = () => {
  const dataFolderPath = join(__dirname, "../../data");
  global.efm = new EnabledFileManager({
    dataFolderPath,
  });
  global.tm = new ThemeManager({
    dataFolderPath,
  });
  setupSettingsUI();
  console.log("Loaded BetterTeams");
};

/****************
  Teams Preload
****************/
const teams_prepath = ipc.send(
  "BETTERTEAMS_INTERNAL_GET_ORIG_PRELOAD_PATH"
);
require(teams_prepath);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
