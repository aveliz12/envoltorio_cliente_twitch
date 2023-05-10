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
    let numPeticiones = 0;
    let timeSeg, timeMil, timeMin;
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

            timeMil = (await casoPrueba1(first)).time.milisegundos;
            timeSeg = (await casoPrueba1(first)).time.segundos;
            timeMin = (await casoPrueba1(first)).time.minutos;

            numPeticiones = (await casoPrueba1(first)).requests;
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
          });

          timeSeg = (await casoPrueba2(first, first2)).time.segundos;
          timeMil = (await casoPrueba2(first, first2)).time.milisegundos;
          timeMin = (await casoPrueba2(first, first2)).time.minutos;
          numPeticiones = (await casoPrueba2(first, first2)).requests;

          break;
        case "3":
          console.log(
            "<=================NIVEL 3 REST=================>".red.bold
          );
          await distribucionDatosCaso3().then((resp) => {
            first = resp.first;
            first2 = resp.firts2;
            first3 = resp.firts3;
          });

          timeSeg = (await casoPrueba3(first, first2, first3)).time.segundos;
          timeMil = (await casoPrueba3(first, first2, first3)).time
            .milisegundos;
          timeMin = (await casoPrueba3(first, first2, first3)).time.minutos;
          numPeticiones = (await casoPrueba3(first, first2, first3)).requests;

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
          });

          timeSeg = (await casoPrueba4(first, first2, first3, first4)).time
            .segundos;
          timeMil = (await casoPrueba4(first, first2, first3, first4)).time
            .milisegundos;
          timeMin = (await casoPrueba4(first, first2, first3, first4)).time
            .minutos;
          numPeticiones = (await casoPrueba4(first, first2, first3, first4))
            .requests;
          break;
        case "5":
          console.log(
            "<=================NIVEL 5 REST=================>".red.bold
          );
          await distribucionDatosCaso4().then((resp) => {
            first = resp.first;
            first2 = resp.firts2;
            first3 = resp.firts3;
            first4 = resp.firts4;
            first5 = resp.firts5;
          });

          timeSeg = (await casoPrueba4(first, first2, first3, first4, first5))
            .time.segundos;
          timeMil = (await casoPrueba4(first, first2, first3, first4, first5))
            .time.milisegundos;
          timeMin = (await casoPrueba4(first, first2, first3, first4, first5))
            .time.minutos;
          numPeticiones = (
            await casoPrueba4(first, first2, first3, first4, first5)
          ).requests;
          break;
        default:
          break;
      }

      console.log(`Tiempo: ${timeMil} milisegundos.`.underline);
      console.log(`Tiempo: ${timeSeg} segundos.`.underline);
      console.log(`Tiempo: ${timeMin} minutos.`.underline);

      console.log(`Peticiones: ${numPeticiones}.`.underline);
    } while (opt !== "0");
  }
};
