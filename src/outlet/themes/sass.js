const fs = require("fs");
const { renderSync } = require("sass");
const { join } = require("path");

const compileSass = (
  themePath,
  mainFilePath,
  version
) => {
  const dir = join(themePath, "_compiled");
  const compiled = renderSync({
    file: mainFilePath,
    outputStyle: "compressed",
  }).css.toString();

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(
    join(dir, "info.json"),
    JSON.stringify({ version: version })
  );

  fs.writeFileSync(join(dir, "main.css"), compiled);

  console.log(compiled);
};

compileSass(process.argv[2], process.argv[3], process.argv[4]);
