const fs = require("fs");
const { join } = require("path");

module.exports = setupSettingsUI = () => {
  const css = fs
    .readFileSync(join(__dirname, "../../data/style/settings.css"))
    .toString();
  const styleNode = document.createElement("style");
  styleNode.innerHTML = css;
  document.head.appendChild(styleNode);
};