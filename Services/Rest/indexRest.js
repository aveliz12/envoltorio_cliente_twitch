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
              "<=================NIVEL 1 REST=================>".red.bold
            );
            first = await distribucionDatosCaso1();
            console.log("Cantidad de datos por nivel: ", first);

            const { time, requests } = await casoPrueba1(first);
            imprimirDatos(time, requests);
          } catch (error) {
            console.log(error);
          }
          break;
        case "2":
          console.log(
            "<=================NIVEL 2 REST=================>".red.bold
          );
          await distribucionDatosCaso2().then((resp) => {
            first = resp.first;
            first2 = resp.firts2;
            console.log("Cantidad de datos por nivel: ", resp);
          });

          const { time2, requests2 } = await casoPrueba2(first, first2);
          imprimirDatos(time2, requests2);
          break;
        case "3":
          console.log(
            "<=================NIVEL 3 REST=================>".red.bold
          );
          await distribucionDatosCaso3().then((resp) => {
            first = resp.first;
            first2 = resp.firts2;
            first3 = resp.firts3;
            console.log("Cantidad de datos por nivel: ", resp);
          });

          const { time3, requests3 } = await casoPrueba3(first, first2, first3);
          imprimirDatos(time3, requests3);
          break;
        case "4":
          console.log(
            "<=================NIVEL 4 REST=================>".red.bold
          );

          await distribucionDatosCaso4().then((resp) => {
            first = resp.first;
            first2 = resp.firts2;
            first3 = resp.firts3;
            first4 = resp.firts4;
            console.log("Cantidad de datos por nivel: ", resp);
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
            "<=================NIVEL 5 REST=================>".red.bold
          );
          await distribucionDatosCaso5().then((resp) => {
            first = resp.first;
            first2 = resp.firts2;
            first3 = resp.firts3;
            first4 = resp.firts4;
            first5 = resp.firts5;
            console.log("Cantidad de datos por nivel: ", resp);
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
