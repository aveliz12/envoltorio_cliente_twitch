import { casoPrueba } from "../Services/Rest/indexRest.js";
import { casoPruebaGraphQLCache } from "../Services/Cache/indexGraphCache.js";
import {
  inquirerMenuPrimary,
  inquireMenuToken,
} from "../Services/Menu/inquirerMenuPrimary.js";
import Storage from "node-storage";
const store = new Storage("./store");
import { getToken } from "../Services/Rest/ApiRest.js";

const token = store.get("token");

const consumoTwtich = async () => {
  let opt = "";

  do {
    opt = await inquirerMenuPrimary();
    switch (opt) {
      case "1":
        await casoPruebaGraphQLCache();
        break;
      case "3":
        await casoPrueba();
        break;
      default:
        break;
    }
  } while (opt !== "0");
};

const main = async () => {
  let opt = "";

  try {
    console.log(`Su token generado anteriormente es: ${token}`);
    console.log("Desea generar un nuevo token? ");
    do {
      opt = await inquireMenuToken();

      switch (opt) {
        case "1":
          await getToken();
          console.log(`Su nuevo token generado es: ${token}`);

          await consumoTwtich();
          break;
        case "2":
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
