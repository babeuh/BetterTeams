const fs = require("fs");
const { join } = require("path");
const { spawnSync } = require("child_process");

class Theme {
  constructor(params) {
    this.name = params.name;
    this.author = params.author;
    this.id = params.id;
    this.version = params.version;
    this.data = params.data;
    this.info = params.info;
    this.description = params.description;
    this.url = params.url;

    const element = document.createElement("style");
    element.id = this.id;
    element.innerHTML = this.data;
    this.element = element;
  }

  enable() {
    document.head.appendChild(this.element);
    this.isEnabled = true;
  }

  disable() {
    document.head.removeChild(this.element);
    this.isEnabled = false;
  }

  update(data, version) {
    this.data = data;
    this.version = version;
    this.element.innerHTML = this.data;
  }
}

module.exports = class ThemeManager {
  constructor(opts) {
    this.dataFolderPath = opts.dataFolderPath;
    this.themesFolderPath = join(this.dataFolderPath, "themes");
    this.enabledFilePath = join(this.dataFolderPath, "enabled.json");
    this.themes = new Map();
    this.reloadThemes();
  }

  reloadThemes() {
    for (const [_, theme] of this.themes.entries()) {
      if (theme.isEnabled) theme.disable();
    }
    this.themes.clear();
    let themeFolders = fs.readdirSync(this.themesFolderPath);
    themeFolders = themeFolders.filter((t) => t !== ".gitkeep");
    for (let i = 0; i < themeFolders.length; i++) {
      const themeFolderPath = join(this.themesFolderPath, themeFolders[i]);
      const manifest = require(join(themeFolderPath, "manifest.json"));
      const mainFilePath = join(themeFolderPath, manifest.mainFile);
      let data;
      if (manifest.type === "sass" || manifest.type === "sass_dev") {
        data = this.handleSassTheme(
          themeFolderPath,
          mainFilePath,
          manifest.version,
          manifest.type === "sass_dev"
        );
      } else {
        data = fs.readFileSync(mainFilePath).toString();
      }
      const id = `theme@${manifest.author}/${manifest.name}`;
      const theme = new Theme({
        name: manifest.name,
        author: manifest.author,
        version: manifest.version,
        description: manifest.description,
        url: manifest.url,
        data: data,
        id: id,
        info: {
          type: manifest.type,
          themeFolderPath: themeFolderPath,
          mainFilePath: mainFilePath,
        },
      });
      this.themes.set(id, theme);
    }
    const enabledThemes = global.efm.enabled.themes;
    for (let i = 0; i < enabledThemes.length; i++) {
      if (this.themes.has(enabledThemes[i])) {
        this.themes.get(enabledThemes[i]).enable();
      } else {
        this.updateEnabledFile(enabledThemes[i], false);
      }
    }
  }

  enableTheme(themeId) {
    if (!this.themes.has(themeId)) throw new Error(`${themeId} not found`);
    const theme = this.themes.get(themeId);
    if (theme.isEnabled) throw new Error(`${themeId} is already enabled`);
    if (theme.info.type === "sass_dev" || theme.info.type === "dev") {
      this.reloadTheme(themeId, theme.version);
    }
    theme.enable();
    this.updateEnabledFile(themeId, true);
  }

  disableTheme(themeId) {
    if (!this.themes.has(themeId)) throw new Error(`${themeId} not found`);
    const theme = this.themes.get(themeId);
    if (!theme.isEnabled) throw new Error(`${themeId} is already disabled`);
    theme.disable();
    this.updateEnabledFile(themeId, false);
  }

  reloadTheme(themeId, newVersion) {
    if (!this.themes.has(themeId)) throw new Error(`${themeId} not found`);
    const theme = this.themes.get(themeId);

    let wasEnabled = false;
    if (theme.isEnabled) {
      theme.disable();
      wasEnabled = true;
    }

    let data = "";
    if (theme.info.type === "sass" || theme.info.type === "sass_dev") {
      data = this.handleSassTheme(
        theme.info.themeFolderPath,
        theme.info.mainFilePath,
        newVersion,
        theme.info.type === "sass_dev"
      );
    } else {
      data = fs.readFileSync(theme.info.mainFilePath).toString();
    }
    theme.update(data, newVersion);
    if (wasEnabled) {
      theme.enable();
    }
  }

  getThemeStatus(themeId) {
    if (!this.themes.has(themeId)) throw new Error(`${themeId} not found`);
    return this.themes.get(themeId).isEnabled;
  }

  updateEnabledFile = (themeId, add) => {
    let enabled = global.efm.enabled;
    if (add) {
      if (enabled.themes.includes(themeId)) return;
      enabled.themes.push(themeId);
    } else {
      enabled.themes = enabled.themes.filter((e) => e !== themeId);
    }
    global.efm.updateEnabledFile(enabled);
  };

  handleSassTheme(themeFolderPath, mainFilePath, manifestVersion, isDev) {
    if (!fs.existsSync(mainFilePath))
      throw new Error(`${mainFilePath} does not exist`);

    let data = "";
    let compile = false;
    let info = { version: "0.0.0" };
    let themeVersion = manifestVersion;

    if (
      !fs.existsSync(join(themeFolderPath, "_compiled")) ||
      !fs.existsSync(join(themeFolderPath, "_compiled/info.json")) ||
      !fs.existsSync(join(themeFolderPath, "_compiled/main.css"))
    ) {
      // hasn't been compiled so we force it
      compile = true;
    } else {
      // has been compiled so only compile if uncompiled theme is newer
      info = JSON.parse(
        fs.readFileSync(join(themeFolderPath, "_compiled/info.json")).toString()
      );
      compile =
        Number.parseFloat(manifestVersion.replace(".", "")) >
        Number.parseFloat(info.version.replace(".", ""));
    }

    if (compile || isDev) {
      const child = spawnSync("node", [
        join(__dirname, "../themes/sass"),
        themeFolderPath,
        mainFilePath,
        themeVersion,
      ]);
      data = child.stdout.toString();
    } else {
      data = fs
        .readFileSync(join(themeFolderPath, "_compiled/main.css"))
        .toString();
    }
    return data;
  }
};
