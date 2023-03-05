const {
  getCasoPrueba1RestCache,
  getCasoPrueba2RestCache,
  getCasoPrueba3RestCache,
  getCasoPrueba4RestCache,
  getCasoPrueba5RestCache,
} = require("./casoPruebaRestCache.cjs");

const { inquirerMenu } = require("../../Menu/inquirerMenu.cjs");
const Storage = require("node-storage");
const store = new Storage("../../../store");

const token = store.get("token");

const casoPruebaCacheRest = async () => {
  console.log("*****************API-REST TWITCH CACHE*****************".magenta);
  if (token === "") {
    console.log("Generar un token por favor.");
    return;
  } else {
    //console.log(`Su token generado es: ${token}`);
    let opt = "";
    do {
      opt = await inquirerMenu();

      switch (opt) {
        case "1":
          try {
            await getCasoPrueba1RestCache();
          } catch (error) {
            console.log(error);
          }
          break;
        case "2":
          await getCasoPrueba2RestCache();
          break;
        case "3":
          await getCasoPrueba3RestCache();
          break;
        case "4":
          await getCasoPrueba4RestCache();
          break;
        case "5":
          await getCasoPrueba5RestCache();
          break;
        default:
          break;
      }
    } while (opt !== "0");
  }
};

module.exports = {
  casoPruebaCacheRest,
};
