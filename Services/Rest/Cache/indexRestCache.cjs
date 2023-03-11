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
  console.log(
    "********************API-REST TWITCH CON CACHE********************"
      .bgMagenta.bold
  );
  if (token === "") {
    console.log("Generar un token por favor.");
    return;
  } else {
    console.log(`Su token generado es: ${token}`.bold);
    let opt = "";
    let time;
    do {
      opt = await inquirerMenu();

      switch (opt) {
        case "1":
          try {
            console.log(
              "<=================NIVEL 1 REST-CACHE=================>".red.bold
            );
            time = (await getCasoPrueba1RestCache()).time;
          } catch (error) {
            console.log(error);
          }
          break;
        case "2":
          console.log(
            "<=================NIVEL 2 REST-CACHE=================>".red.bold
          );
          time = (await getCasoPrueba2RestCache()).time;
          break;
        case "3":
          console.log(
            "<=================NIVEL 3 REST-CACHE=================>".red.bold
          );
          time = (await getCasoPrueba3RestCache()).time;
          break;
        case "4":
          console.log(
            "<=================NIVEL 4 REST-CACHE=================>".red.bold
          );
          time = (await getCasoPrueba4RestCache()).time;
          break;
        case "5":
          console.log(
            "<=================NIVEL 5 REST-CACHE=================>".red.bold
          );
          time = (await getCasoPrueba5RestCache()).time;
          break;
        default:
          break;
      }

      console.log(
        `La consulta desde cache en REST tardó: ${time} segundos.`.red
      );
    } while (opt !== "0");
  }
};

module.exports = {
  casoPruebaCacheRest,
};
