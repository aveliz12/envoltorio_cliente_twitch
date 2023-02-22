import {
  casoPrueba1Cache,
  casoPrueba2Cache,
  casoPrueba3Cache,
  casoPrueba4Cache,
  casoPrueba5Cache,
} from "./ApiRestCache.js";
import Storage from "node-storage";
const store = new Storage("./store");
//import { getToken } from "../Services/ApiRest.js";
//import promptSync from "prompt-sync";
import { inquirerMenu } from "../Menu/inquirerMenu.js";

const token = store.get("token");
const id = "";

export const casoPruebaCache = async () => {
  console.log("**********API-REST TWITCH-CACHE**********".magenta);

  if (token === "") {
    console.log("Genere un token porfavor");
    return;
  } else {
    let opt = "";
    console.log(`Su token generado es: ${token}`);

    do {
      opt = await inquirerMenu();

      switch (opt) {
        case "1":
          try {
            const caso1 = await casoPrueba1Cache();
            console.log(caso1);
          } catch (error) {
            console.log(error);
          }
          break;
        case "2":
          const caso2 = await casoPrueba2Cache(id);
          console.log(caso2);
        case "3":
          const caso3 = await casoPrueba3Cache(id);
          console.log(caso3);
        case "4":
          const caso4 = await casoPrueba4Cache(id);
          console.log(caso4);
        case "5":
          const caso5 = await casoPrueba5Cache(id);
          console.log(caso5);
        default:
          break;
      }
    } while (opt !== "0");
  }
};
