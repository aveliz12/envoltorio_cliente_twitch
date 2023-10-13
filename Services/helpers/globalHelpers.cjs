const fs = require("fs");
const path = require("path");

const saveFileCasoPrueba = (fileName, dataJson, dir) => {
  const pathComplete = path.join(
    __dirname,
    "..",
    `archivos/${dir}`,
    `${fileName}.json`
  );

  const datosJSONString = JSON.stringify(dataJson, null, 2);

  fs.writeFileSync(pathComplete, datosJSONString, "utf8");

  console.log(`El archivo JSON ${fileName} se ha guardado en: ${pathComplete}`);
};
module.exports = {
  saveFileCasoPrueba,
};
