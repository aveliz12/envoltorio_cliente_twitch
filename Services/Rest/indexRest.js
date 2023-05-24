import {
  casoPrueba1,
  casoPrueba2,
  casoPrueba3,
  casoPrueba4,
  casoPrueba5,
} from "../Rest/TestCases.js";

import "colors";
import Storage from "node-storage";
import pkgDistribucion from "../Menu/distribucion.cjs";
import pkg from "../Menu/inquirerMenu.cjs";
const {
  distribucionDatosCaso1,
  distribucionDatosCaso2,
  distribucionDatosCaso3,
  distribucionDatosCaso4,
  distribucionDatosCaso5,
} = pkgDistribucion;
const { inquirerMenu } = pkg;
const store = new Storage("./store");

const token = store.get("token");

const imprimirDatos = (time, requests) => {
  console.log(`Tiempo: ${time.milisegundos} milisegundos.`.underline);
  console.log(`Tiempo: ${time.segundos} segundos.`.underline);
  console.log(`Tiempo: ${time.minutos} minutos.`.underline);

  console.log(`Peticiones: ${requests}.`.underline);
};
export const casoPrueba = async () => {
  console.log(
    "*************************API-REST TWITCH*************************"
      .bgMagenta.bold
  );
  if (token === "") {
    console.log("Genere un token por favor.");
    return;
  } else {
    console.log(`Su token generado es: ${token}`.bold);
    let opt = " ";
    try {
      do {
        opt = await inquirerMenu();

        switch (opt) {
          case "1":
            console.log(
              "<=================NIVEL 1 REST=================>".red.bold
            );
            await distribucionDatosCaso1().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 1: ",
                resp
              );
              const { time, requests } = await casoPrueba1(resp);
              imprimirDatos(time, requests);
            });

            break;
          case "2":
            console.log(
              "<=================NIVEL 2 REST=================>".red.bold
            );
            await distribucionDatosCaso2().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 2: ",
                resp
              );
              const { time2, requests2 } = await casoPrueba2(
                resp.limiteNivel1,
                resp.limiteNivel2
              );
              imprimirDatos(time2, requests2);
            });

            break;
          case "3":
            console.log(
              "<=================NIVEL 3 REST=================>".red.bold
            );
            await distribucionDatosCaso3().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 3: ",
                resp
              );
              const { time3, requests3 } = await casoPrueba3(
                resp.limiteNivel1,
                resp.limiteNivel2,
                resp.limiteNivel3
              );
              imprimirDatos(time3, requests3);
            });

            break;
          case "4":
            console.log(
              "<=================NIVEL 4 REST=================>".red.bold
            );

            await distribucionDatosCaso4().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 4: ",
                resp
              );
              const { time4, requests4 } = await casoPrueba4(
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
              "<=================NIVEL 5 REST=================>".red.bold
            );
            await distribucionDatosCaso5().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 5: ",
                resp
              );
              const { time5, requests5 } = await casoPrueba5(
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
