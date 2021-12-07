const BetterTeamsPlugin = require("../../../src/outlet/plugins/plugin");
const { EventEmitter } = require("events");
class Emitter extends EventEmitter {}

const cog_icon =
  '<svg-include src="::tabItem.icon"><svg viewBox="-6 -6 32 32" class="app-svg icons-settings" focusable="false" role="presentation"><g class="icons-default-fill"><path class="icons-filled" d="M1.91099 7.38266C2.28028 6.24053 2.88863 5.19213 3.69133 4.30364C3.82707 4.15339 4.04002 4.09984 4.23069 4.16802L6.14897 4.85392C6.66905 5.03977 7.24131 4.76883 7.42716 4.24875C7.44544 4.19762 7.45952 4.14507 7.46925 4.09173L7.83471 2.08573C7.87104 1.88627 8.02422 1.7285 8.22251 1.6863C8.8027 1.5628 9.39758 1.5 10.0003 1.5C10.6026 1.5 11.1971 1.56273 11.7769 1.68607C11.9752 1.72824 12.1284 1.88591 12.1648 2.08529L12.5313 4.09165C12.6303 4.63497 13.1511 4.9951 13.6944 4.89601C13.7479 4.88627 13.8004 4.87219 13.8515 4.85395L15.7698 4.16802C15.9605 4.09984 16.1734 4.15339 16.3092 4.30364C17.1119 5.19213 17.7202 6.24053 18.0895 7.38266C18.1518 7.57534 18.0918 7.78658 17.9374 7.91764L16.3825 9.23773C15.9615 9.5952 15.9101 10.2263 16.2675 10.6473C16.3027 10.6887 16.3411 10.7271 16.3825 10.7623L17.9374 12.0824C18.0918 12.2134 18.1518 12.4247 18.0895 12.6173C17.7202 13.7595 17.1119 14.8079 16.3092 15.6964C16.1734 15.8466 15.9605 15.9002 15.7698 15.832L13.8515 15.1461C13.3315 14.9602 12.7592 15.2312 12.5733 15.7512C12.5551 15.8024 12.541 15.8549 12.5312 15.9085L12.1648 17.9147C12.1284 18.1141 11.9752 18.2718 11.7769 18.3139C11.1971 18.4373 10.6026 18.5 10.0003 18.5C9.39758 18.5 8.8027 18.4372 8.22251 18.3137C8.02422 18.2715 7.87104 18.1137 7.83471 17.9143L7.46926 15.9084C7.37018 15.365 6.8494 15.0049 6.30608 15.104C6.25265 15.1137 6.20011 15.1278 6.14906 15.1461L4.23069 15.832C4.04002 15.9002 3.82707 15.8466 3.69133 15.6964C2.88863 14.8079 2.28028 13.7595 1.91099 12.6173C1.84869 12.4247 1.90876 12.2134 2.06313 12.0824L3.61798 10.7623C4.03897 10.4048 4.09046 9.77373 3.73299 9.35274C3.69784 9.31135 3.65937 9.27288 3.618 9.23775L2.06313 7.91764C1.90876 7.78658 1.84869 7.57534 1.91099 7.38266ZM8.00026 10C8.00026 11.1046 8.89569 12 10.0003 12C11.1048 12 12.0003 11.1046 12.0003 10C12.0003 8.89543 11.1048 8 10.0003 8C8.89569 8 8.00026 8.89543 8.00026 10Z"></path><path class="icons-unfilled" d="M1.91099 7.38266C2.28028 6.24053 2.88863 5.19213 3.69133 4.30364C3.82707 4.15339 4.04002 4.09984 4.23069 4.16802L6.14897 4.85392C6.66905 5.03977 7.24131 4.76883 7.42716 4.24875C7.44544 4.19762 7.45952 4.14507 7.46925 4.09173L7.83471 2.08573C7.87104 1.88627 8.02422 1.7285 8.22251 1.6863C8.8027 1.5628 9.39758 1.5 10.0003 1.5C10.6026 1.5 11.1971 1.56273 11.7769 1.68607C11.9752 1.72824 12.1284 1.88591 12.1648 2.08529L12.5313 4.09165C12.6303 4.63497 13.1511 4.9951 13.6944 4.89601C13.7479 4.88627 13.8004 4.87219 13.8515 4.85395L15.7698 4.16802C15.9605 4.09984 16.1734 4.15339 16.3092 4.30364C17.1119 5.19213 17.7202 6.24053 18.0895 7.38266C18.1518 7.57534 18.0918 7.78658 17.9374 7.91764L16.3825 9.23773C15.9615 9.5952 15.9101 10.2263 16.2675 10.6473C16.3027 10.6887 16.3411 10.7271 16.3825 10.7623L17.9374 12.0824C18.0918 12.2134 18.1518 12.4247 18.0895 12.6173C17.7202 13.7595 17.1119 14.8079 16.3092 15.6964C16.1734 15.8466 15.9605 15.9002 15.7698 15.832L13.8515 15.1461C13.3315 14.9602 12.7592 15.2312 12.5733 15.7512C12.5551 15.8024 12.541 15.8549 12.5312 15.9085L12.1648 17.9147C12.1284 18.1141 11.9752 18.2718 11.7769 18.3139C11.1971 18.4373 10.6026 18.5 10.0003 18.5C9.39758 18.5 8.8027 18.4372 8.22251 18.3137C8.02422 18.2715 7.87104 18.1137 7.83471 17.9143L7.46926 15.9084C7.37018 15.365 6.8494 15.0049 6.30608 15.104C6.25265 15.1137 6.20011 15.1278 6.14906 15.1461L4.23069 15.832C4.04002 15.9002 3.82707 15.8466 3.69133 15.6964C2.88863 14.8079 2.28028 13.7595 1.91099 12.6173C1.84869 12.4247 1.90876 12.2134 2.06313 12.0824L3.61798 10.7623C4.03897 10.4048 4.09046 9.77373 3.73299 9.35274C3.69784 9.31135 3.65937 9.27288 3.618 9.23775L2.06313 7.91764C1.90876 7.78658 1.84869 7.57534 1.91099 7.38266ZM2.97154 7.37709L4.26523 8.47546C4.34803 8.54576 4.42496 8.62269 4.49526 8.70548C5.2102 9.54746 5.10721 10.8096 4.26521 11.5246L2.97154 12.6229C3.26359 13.4051 3.68504 14.1322 4.21648 14.7751L5.81246 14.2044C5.91473 14.1679 6.01982 14.1397 6.12667 14.1202C7.21332 13.922 8.25487 14.6423 8.45305 15.729L8.75702 17.3975C9.16489 17.4655 9.58024 17.5 10.0003 17.5C10.42 17.5 10.8351 17.4656 11.2427 17.3976L11.5475 15.7289C11.567 15.6221 11.5951 15.517 11.6317 15.4147C12.0034 14.3746 13.1479 13.8327 14.1881 14.2044L15.784 14.7751C16.3155 14.1322 16.7369 13.4051 17.029 12.6229L15.7353 11.5245C15.6525 11.4542 15.5756 11.3773 15.5053 11.2945C14.7903 10.4525 14.8933 9.1904 15.7353 8.47544L17.029 7.37709C16.7369 6.59486 16.3155 5.86783 15.784 5.22494L14.1881 5.79559C14.0858 5.83214 13.9807 5.8603 13.8738 5.87979C12.7872 6.07796 11.7456 5.3577 11.5475 4.27119L11.2427 2.60235C10.8351 2.53443 10.42 2.5 10.0003 2.5C9.58024 2.5 9.16489 2.53448 8.75702 2.60249L8.45304 4.27105C8.43355 4.37791 8.40539 4.48299 8.36884 4.58527C7.99714 5.62542 6.8526 6.1673 5.81237 5.79556L4.21648 5.22494C3.68504 5.86783 3.26359 6.59486 2.97154 7.37709ZM7.50026 10C7.50026 8.61929 8.61954 7.5 10.0003 7.5C11.381 7.5 12.5003 8.61929 12.5003 10C12.5003 11.3807 11.381 12.5 10.0003 12.5C8.61954 12.5 7.50026 11.3807 7.50026 10ZM8.50026 10C8.50026 10.8284 9.17183 11.5 10.0003 11.5C10.8287 11.5 11.5003 10.8284 11.5003 10C11.5003 9.17157 10.8287 8.5 10.0003 8.5C9.17183 8.5 8.50026 9.17157 8.50026 10Z"></path></g></svg></svg-include>';

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

const createElementFromHTML = (htmlString) => {
  var template = document.createElement("template");
  template.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return template.content.firstChild;
};

module.exports = class Plugin extends BetterTeamsPlugin {
  loadPlugin() {
    this.emitter = new Emitter();
    this.emitter.on("settingsMenuDropdown", () => {
      const ele = document.getElementsByTagName("settings-menu-dropdown")[0]
        .children[0].children[0].children[0].children[0];

      ele.setAttribute("ng-click", "handleNewClick(this)");
      ele.id = "settings-menu-dropdown-settings-button";

      this.injector
        .scope("#settings-menu-dropdown-settings-button")
        .set("handleNewClick", () => {
          wusr(".options-settings-dialog", () => {
            this.emitter.emit("settingsMenu");
          });
        });
    });

    this.emitter.on("settingsMenu", () => {
      themeSettings();
      pluginSettings();
      handleOriginalSettingsButtons();
    });

    wusr("#settings-menu-button", () => {
      document
        .getElementById("settings-menu-button")
        .setAttribute("ng-click", "handleNewClick(this)");

      this.injector
        .scope("#settings-menu-button")
        .set("handleNewClick", (t) => {
          const ctrl = t.settingsMenuBtnCtrl;
          // is only not null if this is the open click
          if (ctrl.settingsMenuPopover === null) return;
          wusr("settings-menu-dropdown", () => {
            this.emitter.emit("settingsMenuDropdown");
          });
        });
    });
  }

  unloadPlugin() {
    document.getElementById("settings-menu-button").click();
    wusr("#settings-menu-dropdown-settings-button", () => {
      this.injector.uninjectAll();
    });
  }
};

const handleOriginalSettingsButtons = () => {
  const origButtons = document.getElementsByClassName(
    "options-settings-left-item ng-scope"
  );
  for (let i = 0; i < origButtons.length; i++) {
    origButtons[i].addEventListener("click", (e) => {
      if (!e.currentTarget.className.includes("selected"))
        e.currentTarget.className += " selected";
      const newButtons = document.getElementsByClassName(
        "options-settings-left-item betterteams-settings-left-item"
      );
      for (let i = 0; i < newButtons.length; i++) {
        newButtons[i].className =
          "options-settings-left-item betterteams-settings-left-item";
      }
      const rightTabs = document.getElementsByClassName(
        "options-settings-right-item ng-scope"
      );
      for (let i = 0; i < rightTabs.length; i++) {
        rightTabs[i].style = "";
      }

      const newTabs = document.getElementsByClassName(
        "betterteams-settings-tab"
      );
      for (let i = 0; i < newTabs.length; i++) {
        newTabs[i].remove();
      }
    });
  }
};

const createBetterTeamsSettingsButton = (opts) => {
  const button = document.createElement("div");
  button.className =
    "options-settings-left-item betterteams-settings-left-item";
  button.innerHTML =
    cog_icon +
    `<span class="single-line-truncation" title="${opts.text}">${opts.text}</span>`;

  button.addEventListener("click", (e) => {
    if (button.className.includes("selected")) {
      return;
    }
    const newTabs = document.getElementsByClassName("betterteams-settings-tab");
    for (let i = 0; i < newTabs.length; i++) {
      newTabs[i].remove();
    }
    let bu = document.getElementsByClassName(
      "options-settings-left-item selected"
    )[0];
    if (bu === undefined)
      bu = document.getElementsByClassName(
        "options-settings-left-item selected"
      )[0];
    if (bu.className.includes("ng-scope")) {
      bu.className = "options-settings-left-item ng-scope";
    } else {
      bu.className = "options-settings-left-item";
    }
    button.className =
      "options-settings-left-item betterteams-settings-left-item selected";

    const rightTabs = document.getElementsByClassName(
      "options-settings-right-item ng-scope"
    );
    for (let i = 0; i < rightTabs.length; i++) {
      rightTabs[i].style = "display:none;";
    }
    document
      .getElementsByClassName("options-settings-right ng-scope")[0]
      .appendChild(opts.tab);
  });
  document
    .getElementsByClassName("options-settings-left")[0]
    .children[0].appendChild(button);
  return button;
};

const createBetterTeamsSettingsTab = (opts) => {
  const tab = createElementFromHTML(
    `<div class="betterteams-settings-tab"><h2 class="app-font-base-bold">${opts.title}</h2></div>`
  );
  return tab;
};

const createModBox = (opts) => {
  const div = document.createElement("div");
  div.className = "betterteams-mod-box";
  div.id = "div&" + opts.id;
  div.innerHTML = `
        <div class="betterteams-mod-status ${
          opts.enabled ? "betterteams-mod-enabled" : "betterteams-mod-disabled"
        }"></div>
        <span class="betterteams-mod-name">${opts.name}</span>
        <span class="betterteams-mod-author">${opts.author}</span>
        <span class="betterteams-mod-description">${opts.description}</span>
        <a class="betterteams-mod-url" target="_blank" href="${opts.url}">${
    opts.url
  }</a>
      `;
  return div;
};

const reloadTab = (opts) => {
  opts.tab.innerHTML = `<h2 class="app-font-base-bold">${opts.title}</h2>`;
  for (const [_, mod] of opts.map) {
    const div = createModBox({
      name: mod.name,
      author: mod.author,
      description: mod.description,
      url: mod.url,
      id: mod.id,
      enabled: mod.enabled,
    });
    div.children[0].addEventListener("click", (e) => {
      if (mod.enabled) {
        if (opts.type === "theme") global.tm.disableTheme(mod.id);
        if (opts.type === "plugin") {
          if (!global.pm.plugins.get(mod.id).canDisable) {
            return;
          }
          global.pm.disablePlugin(mod.id);
        }
      } else {
        if (opts.type === "theme") global.tm.enableTheme(mod.id);
        if (opts.type === "plugin") global.pm.enablePlugin(mod.id);
      }
      e.currentTarget.className = `betterteams-mod-status ${
        mod.enabled ? "betterteams-mod-enabled" : "betterteams-mod-disabled"
      }`;
    });
    opts.tab.appendChild(div);
  }
};

const themeSettings = () => {
  const settingsThemesTab = createBetterTeamsSettingsTab({ title: "Themes" });
  createBetterTeamsSettingsButton({
    text: "Themes",
    tab: settingsThemesTab,
  });

  reloadTab({
    tab: settingsThemesTab,
    title: "Themes",
    map: global.tm.themes,
    type: "theme",
  });
};

const pluginSettings = () => {
  const settingsPluginsTab = createBetterTeamsSettingsTab({ title: "Plugins" });
  createBetterTeamsSettingsButton({
    text: "Plugins",
    tab: settingsPluginsTab,
  });

  reloadTab({
    tab: settingsPluginsTab,
    title: "Plugins",
    map: global.pm.plugins,
    type: "plugin",
  });
};
