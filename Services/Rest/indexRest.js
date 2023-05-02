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
const { distribucionDatos } = pkgDistribucion;
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
    let time;
    let first = 0;
    do {
      opt = await inquirerMenu();

      switch (opt) {
        case "1":
          try {
            console.log(
              "<=================NIVEL 1 REST=================>".red.bold
            );
            first = await distribucionDatos();
            time = (await casoPrueba1(first)).time;
          } catch (error) {
            console.log(error);
          }
          break;
        case "2":
          console.log(
            "<=================NIVEL 2 REST=================>".red.bold
          );

          time = (await casoPrueba2(first)).time;
          break;
        case "3":
          console.log(
            "<=================NIVEL 3 REST=================>".red.bold
          );

          time = (await casoPrueba3(first)).time;
          break;
        case "4":
          console.log(
            "<=================NIVEL 4 REST=================>".red.bold
          );

          time = (await casoPrueba4(first)).time;
          break;
        case "5":
          console.log(
            "<=================NIVEL 5 REST=================>".red.bold
          );

          time = (await casoPrueba5(first)).time;
          break;
        default:
          break;
      }
      console.log(`La consulta en REST tardó: ${time} segundos.`.red);
    } while (opt !== "0");
  }
};
