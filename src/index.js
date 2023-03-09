import { casoPrueba } from "../Services/Rest/indexRest.js";
import { casoPruebaGraphQLCache } from "../Services/GraphQL/Cache/indexGraphCache.js";
import pkg from "../Services/Rest/Cache/indexRestCache.cjs";
const { casoPruebaCacheRest } = pkg;
import {
  inquirerMenuPrimary,
  inquireMenuToken,
} from "../Services/Menu/inquirerMenuPrimary.js";
import Storage from "node-storage";
const store = new Storage("./store");
import { getToken } from "../Services/Rest/ApiRest.js";

let token = "";
const consumoTwtich = async () => {
  let opt = "";

  do {
    opt = await inquirerMenuPrimary();
    switch (opt) {
      case "1":
        await casoPrueba();
        break;
      case "2":
        await casoPruebaCacheRest();
        break;
      case "3":
        await casoPruebaGraphQLCache();
        break;
      default:
        break;
    }
  } while (opt !== "0");
};

const main = async () => {
  let opt = "";

  try {
    console.log("Desea generar un nuevo token? ");
    do {
      opt = await inquireMenuToken();

      switch (opt) {
        case "1":
          await getToken();
          token = store.get("token");

          console.log(`Su nuevo token es: ${token}`);

          await consumoTwtich();
          break;
        case "2":
          token = store.get("token");
          console.log(`Su token es: ${token}`);

          await consumoTwtich();
          break;
        default:
          break;
      }
    } while (opt !== "0");
  } catch (error) {
    console.log(error);
  }
};

main();
