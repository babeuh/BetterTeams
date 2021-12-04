const { EventEmitter } = require("events");
const fs = require("fs");
const { join } = require("path");
const themeSettings = require("./themeSettings");

class Emitter extends EventEmitter {}

module.exports = setupSettingsUI = () => {
  const emitter = new Emitter();
  const css = fs
    .readFileSync(join(__dirname, "../../data/style/settings.css"))
    .toString();
  const styleNode = document.createElement("style");
  styleNode.innerHTML = css;
  document.head.appendChild(styleNode);

  emitter.on("settingsMenuDropdown", () => {
    const ele = document.getElementsByTagName("settings-menu-dropdown")[0]
      .children[0].children[0].children[0].children[0];

    ele.setAttribute("ng-click", "handleNewClick(this)");
    ele.id = "settings-menu-dropdown-settings-button";

    compile("#settings-menu-dropdown-settings-button", (scope) => {
      scope.handleNewClick = (t) => {
        wusr(".options-settings-dialog", () => {
          emitter.emit("settingsMenu");
        });
      };
    });
  });

  emitter.on("settingsMenu", () => {
    themeSettings();
  });

  wusr("#settings-menu-button", () => {
    window
      .$("#settings-menu-button")[0]
      .setAttribute("ng-click", "handleNewClick(this)");
    compile("#settings-menu-button", (scope) => {
      scope.handleNewClick = (t) => {
        const ctrl = t.settingsMenuBtnCtrl;
        // is only not null if this is the open click
        if (ctrl.settingsMenuPopover === null) return;
        wusr("settings-menu-dropdown", () => {
          emitter.emit("settingsMenuDropdown");
        });
      };
    });
  });
};

const compile = (selector, func) => {
  window.angular
    .element("html")
    .injector()
    .invoke(function ($compile) {
      const scope = window.angular.element(selector).scope();
      func(scope);
      $compile(selector)(scope);
    });
};

/***************************
Wait until selector is ready
****************************/
const wusr = (selector, callback) => {
  let isReady = window.$(selector)[0] !== undefined;
  if (isReady) {
    callback();
  } else {
    setTimeout(() => {
      wusr(selector, callback);
    }, 50);
  }
};
