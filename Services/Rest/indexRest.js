import {
  casoPrueba1,
  casoPrueba2,
  casoPrueba3,
  casoPrueba4,
  casoPrueba5,
} from "../Rest/TestCases.js";

import "colors";
import pkg from "../Menu/inquirerMenu.cjs";
const { inquirerMenu } = pkg;
import Storage from "node-storage";
const store = new Storage("./store");

const token = store.get("token");
const id = "";

export const casoPrueba = async () => {
  console.log("**********API-REST TWITCH**********".magenta);
  if (token === "") {
    console.log("Genere un token por favor.");
    return;
  } else {
    console.log(`Su token generado es: ${token}`);
    let opt = " ";
    let first = 20;
    do {
      opt = await inquirerMenu();

      switch (opt) {
        case "1":
          try {
            const caso1 = await casoPrueba1(first);
          } catch (error) {
            console.log(error);
          }
          break;
        case "2":
          const caso2 = await casoPrueba2(id);
          break;
        case "3":
          const caso3 = await casoPrueba3(id);
          break;
        case "4":
          const caso4 = await casoPrueba4(id);
          break;
        case "5":
          const caso5 = await casoPrueba5(id);
          break;
        default:
          break;
      }
    } while (opt !== "0");
  }
};
