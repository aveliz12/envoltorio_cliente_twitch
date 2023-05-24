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
const {
  distribucionDatosCaso1,
  distribucionDatosCaso2,
  distribucionDatosCaso3,
  distribucionDatosCaso4,
  distribucionDatosCaso5,
} = require("../../Menu/distribucion.cjs");

const imprimirDatos = (time, requests) => {
  console.log(`Tiempo: ${time.milisegundos} milisegundos.`.underline);
  console.log(`Tiempo: ${time.segundos} segundos.`.underline);
  console.log(`Tiempo: ${time.minutos} minutos.`.underline);

  console.log(`Peticiones: ${requests}.`.underline);
};

const casoPruebaCacheRest = async () => {
  console.log(
    "********************API-REST TWITCH CON CACHE********************"
      .bgMagenta.bold
  );
  if (token === "") {
    console.log("Generar un token por favor.");
    return;
  } else {
    //console.log(`Su token generado es: ${token}`.bold);
    let opt = "";
    try {
      do {
        opt = await inquirerMenu();

        switch (opt) {
          case "1":
            console.log(
              "<=================NIVEL 1 REST-CACHE=================>".red.bold
            );
            await distribucionDatosCaso1().then(async (resp) => {
              console.log("Cantidad de datos por nivel: ", resp);
              const { time, requests1 } = await getCasoPrueba1RestCache(resp);
              imprimirDatos(time, requests1);
            });

            break;
          case "2":
            console.log(
              "<=================NIVEL 2 REST-CACHE=================>".red.bold
            );
            await distribucionDatosCaso2().then(async (resp) => {
              console.log("Cantidad de datos por nivel: ", resp);
              const { time2, requests2 } = await getCasoPrueba2RestCache(
                resp.limiteNivel1,
                resp.limiteNivel2
              );
              imprimirDatos(time2, requests2);
            });

            break;
          case "3":
            console.log(
              "<=================NIVEL 3 REST-CACHE=================>".red.bold
            );
            await distribucionDatosCaso3().then(async (resp) => {
              console.log("Cantidad de datos por nivel: ", resp);
              const { time3, requests3 } = await getCasoPrueba3RestCache(
                resp.limiteNivel1,
                resp.limiteNivel2,
                resp.limiteNivel3
              );
              imprimirDatos(time3, requests3);
            });

            break;
          case "4":
            console.log(
              "<=================NIVEL 4 REST-CACHE=================>".red.bold
            );
            await distribucionDatosCaso4().then(async (resp) => {
              console.log("Cantidad de datos por nivel: ", resp);
              const { time4, requests4 } = await getCasoPrueba4RestCache(
                resp.limiteNivel1,
                resp.limiteNivel2,
                resp.limiteNivel3,
                resp.limiteNivel4
              );
              imprimirDatos(time4, requests4);
            });

            break;
          case "5":
            console.log(
              "<=================NIVEL 5 REST-CACHE=================>".red.bold
            );
            await distribucionDatosCaso5().then(async (resp) => {
              console.log("Cantidad de datos por nivel: ", resp);
              const { time5, requests5 } = await getCasoPrueba5RestCache(
                resp.limiteNivel1,
                resp.limiteNivel2,
                resp.limiteNivel3,
                resp.limiteNivel4,
                resp.limiteNivel5
              );
              imprimirDatos(time5, requests5);
            });
            break;
          default:
            break;
        }
      } while (opt !== "0");
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  casoPruebaCacheRest,
};
