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

  //console.log(`Peticiones: ${requests}.`.underline);
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
    console.log(`Su token generado es: ${token}`.bold);
    let opt = "";
    let first = 0,
      first2 = 0,
      first3 = 0,
      first4 = 0,
      first5 = 0;
    do {
      opt = await inquirerMenu();

      switch (opt) {
        case "1":
          try {
            console.log(
              "<=================NIVEL 1 REST-CACHE=================>".red.bold
            );
            first = await distribucionDatosCaso1();

            const { time, requests1 } = await getCasoPrueba1RestCache(first);
            imprimirDatos(time, requests1);
          } catch (error) {
            console.log(error);
          }
          break;
        case "2":
          console.log(
            "<=================NIVEL 2 REST-CACHE=================>".red.bold
          );
          await distribucionDatosCaso2().then((resp) => {
            first = resp.first;
            first2 = resp.firts2;
          });

          const { time2, requests2 } = await getCasoPrueba2RestCache(
            first,
            first2
          );
          imprimirDatos(time2, requests2);
          break;
        case "3":
          console.log(
            "<=================NIVEL 3 REST-CACHE=================>".red.bold
          );
          await distribucionDatosCaso3().then((resp) => {
            first = resp.first;
            first2 = resp.firts2;
            first3 = resp.firts3;
          });

          const { time3, requests3 } = await getCasoPrueba3RestCache(
            first,
            first2,
            first3
          );
          imprimirDatos(time3, requests3);
          break;
        case "4":
          console.log(
            "<=================NIVEL 4 REST-CACHE=================>".red.bold
          );
          await distribucionDatosCaso4().then((resp) => {
            first = resp.first;
            first2 = resp.firts2;
            first3 = resp.firts3;
            first4 = resp.firts4;
          });

          const { time4, requests4 } = await casoPrueba4(
            first,
            first2,
            first3,
            first4
          );
          imprimirDatos(time4, requests4);
          break;
        case "5":
          console.log(
            "<=================NIVEL 5 REST-CACHE=================>".red.bold
          );
          await distribucionDatosCaso5().then((resp) => {
            first = resp.first;
            first2 = resp.firts2;
            first3 = resp.firts3;
            first4 = resp.firts4;
            first5 = resp.firts5;
          });

          const { time5, requests5 } = await casoPrueba5(
            first,
            first2,
            first3,
            first4,
            first5
          );
          imprimirDatos(time5, requests5);
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
