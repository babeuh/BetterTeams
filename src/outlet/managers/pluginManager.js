const fs = require("fs").promises;
const { join } = require("path");
const { getId } = require("./id");

class Injector {
  constructor(opts) {
    this.ownerId = opts.id;
    this.injectorManager = opts.injectorManager;
  }

  scope(eleSelector) {
    return this.injectorManager.scope(this.ownerId, eleSelector);
  }

  uninjectAll() {
    this.injectorManager.uninjectAll(this.ownerId);
  }

  uninject(eleSelector) {
    this.injectorManager.uninject(this.ownerId, eleSelector)
  }
}

module.exports = class PluginManager {
  constructor(opts) {
    this.dataFolderPath = opts.dataFolderPath;
    this.pluginsFolderPath = join(this.dataFolderPath, "plugins");
    this.injectorManager = opts.injectorManager;
    this.enabledFileManager = opts.enabledFileManager;
    this.plugins = new Map();

    this.loadPlugins();
  }

  async loadPlugins() {
    let pluginFolders = await fs.readdir(this.pluginsFolderPath);
    for (let i = 0; i < pluginFolders.length; i++) {
      if (pluginFolders[i] === ".gitkeep") continue;
      const pluginFolderPath = join(this.pluginsFolderPath, pluginFolders[i]);
      const manifest = require(join(pluginFolderPath, "manifest.json"));
      const mainFilePath = join(pluginFolderPath, manifest.mainFile);

      const Plugin = require(mainFilePath);
      const id = getId("plugin", manifest.author, manifest.name);
      const injector = new Injector({
        id: id,
        injectorManager: this.injectorManager,
      });

      this.plugins.set(
        id,
        new Plugin({
          name: manifest.name,
          author: manifest.author,
          version: manifest.version,
          description: manifest.description,
          url: manifest.url,
          id: id,
          injector: injector,
          canDisable: id !== "plugin@babeuh/betterteams-settings"
        })
      );
      const enabledPlugins = this.enabledFileManager.enabled.plugins;
      for (let i = 0; i < enabledPlugins.length; i++) {
        if (this.plugins.has(enabledPlugins[i])) {
          const plugin = this.plugins.get(enabledPlugins[i])
          plugin.enabled = true
          plugin.loadPlugin()
        } else {
          this.updateEnabledFile(enabledPlugins[i], false);
        }
      }
    }
  }

  enablePlugin(id) {
    const plugin = this.plugins.get(id);

    plugin.loadPlugin();

    plugin.enabled = true;
    this.updateEnabledFile(id, true);
  }

  disablePlugin(id) {
    const plugin = this.plugins.get(id);

    plugin.unloadPlugin();

    plugin.enabled = false;
    this.updateEnabledFile(id, false);
  }

  updateEnabledFile = (id, add) => {
    let enabled = this.enabledFileManager.enabled;
    if (add) {
      if (enabled.plugins.includes(id)) return;
      enabled.plugins.push(id);
    } else {
      enabled.plugins = enabled.plugins.filter((e) => e !== id);
    }
    this.enabledFileManager.updateEnabledFile(enabled);
  };
};
