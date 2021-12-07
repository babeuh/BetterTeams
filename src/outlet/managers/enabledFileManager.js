const { join } = require("path");
const fs = require("fs");

module.exports = class EnabledFileManager {
  constructor(opts) {
    this.dataFolderPath = opts.dataFolderPath;
    this.enabledFilePath = join(this.dataFolderPath, "enabled.json");
    this.enabled = {
      themes: [],
      plugins: ["plugin@babeuh/betterteams-settings"],
    };
    this.checkEnabledFile();
  }

  checkEnabledFile() {
    try {
      const json = JSON.parse(fs.readFileSync(this.enabledFilePath).toString());
      JSON.stringify(json.plugins);
      JSON.stringify(json.themes);
      this.enabled = json;
    } catch (error) {
      const json = { themes: [], plugins: [] };
      this.enabled = json;
      fs.writeFileSync(this.enabledFilePath, JSON.stringify(this.enabled));
    }
  }

  updateEnabledFile(json) {
    fs.writeFileSync(this.enabledFilePath, JSON.stringify(json));
    this.enabled = json;
  }

  getEnabledData() {
    const json = JSON.parse(fs.readFileSync(this.enabledFilePath).toString());
    this.enabled = json;
    return json;
  }
};
