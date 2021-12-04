const fs = require("fs");
const path = require("path");

const patcherPath = path
  .join(__dirname, "/../src/wire/patcher.js")
  .replace(/\\/g, "/");

const defaultPath = path.join(
  process.env.LOCALAPPDATA,
  "Microsoft/Teams/current/resources/app/"
);

if (process.argv[2] === "inject") {
  if (!fs.existsSync(defaultPath)) fs.mkdirSync(defaultPath);
  fs.writeFileSync(
    path.join(defaultPath, "index.js"),
    `require("${patcherPath}")`
  );
  fs.writeFileSync(
    path.join(defaultPath, "package.json"),
    `{\n"name": "Teams",\n"main": "index.js"\n}`
  );
} else if (process.argv[2] === "uninject") {
  fs.rmSync(path.join(defaultPath, "index.js"))
  fs.rmSync(path.join(defaultPath, "package.json"))
  fs.rmdirSync(defaultPath)
} else {
  console.log("No operation specified")
}
