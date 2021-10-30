const fs = require("fs-extra");

const tsConfigJsonPath = "./tsconfig.json";
const tsConfigJson = require(tsConfigJsonPath);

(async () => {
  tsConfigJson.extends = "./tsconfig.web.json";
  await fs.writeFile(
    tsConfigJsonPath,
    JSON.stringify(tsConfigJson, null, 2) + "\n"
  );
})();
