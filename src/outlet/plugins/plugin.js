module.exports = class BetterTeamsPlugin {
  constructor(opts) {
    this.name = opts.name;
    this.author = opts.author;
    this.version = opts.version;
    this.description = opts.description;
    this.url = opts.url;
    
    this.id = opts.id;
    this.injector = opts.injector;
    this.enabled = false;
    this.canDisable = opts.canDisable;
  }
}