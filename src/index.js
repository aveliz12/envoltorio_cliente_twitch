import {
  casoPrueba1,
  casoPrueba2,
  casoPrueba3,
  casoPrueba4,
  casoPrueba5,
} from "../Services/TestCases.js";

//CACHE
import {
  casoPrueba1Cache
} from "../Services/Cache/TestCasesCache.js";


import Storage from "node-storage";
const store = new Storage("./store");
//import { getToken } from "../Services/ApiRest.js";
import promptSync from "prompt-sync";
const prompt = promptSync();

const casos = "caso1";
const token = store.get("token");
const id = "";

const casoPrueba = async () => {
  if (token === "") {
    console.log("Genere un token porfavor");
    return;
  } else {
    console.log(`Su token generado es: ${token}`);
    console.log(
      "Lista de casos.\n" +
        "1- 1° Nivel: Streams en vivo\n" +
        "2- 2° Nivel: Video por juego\n" +
        "3- 3° Nivel: Información del canal\n" +
        "4- 4° Nivel: Clips por usuario\n" +
        "5- 5° Nivel: Informacion del juego\n" +
        "Ingrese el caso que desee consultar: "
    );
    //let text = prompt("Por favor ingrese el nivel que desea consultar: ");
    let numCase = 1;
    switch (numCase) {
      case 1:
        try {
          const caso1 = await casoPrueba1();
          return caso1;
        } catch (error) {
          console.log(error);
        }
        break;
      case 2:
        const caso2 = await casoPrueba2(id);
        return caso2;
      case 3:
        const caso3 = await casoPrueba3(id);
        return caso3;
      case 4:
        const caso4 = await casoPrueba4(id);
        return caso4;
      case 5:
        const caso5 = await casoPrueba5(id);
        return caso5;
      default:
        console.log("Porfavor solo ingrese un valor del 1 al 5");
        break;
    }
  }
};

const casoPruebaCache = async () => {
  if (token === "") {
    console.log("Genere un token porfavor");
    return;
  } else {
    console.log(`Su token generado es: ${token}`);
    console.log(
      "Lista de casos.\n" +
        "1- 1° Nivel: Streams en vivo\n" +
        "2- 2° Nivel: Video por juego\n" +
        "3- 3° Nivel: Información del canal\n" +
        "4- 4° Nivel: Clips por usuario\n" +
        "5- 5° Nivel: Informacion del juego\n" +
        "Ingrese el caso que desee consultar: "
    );
    //let text = prompt("Por favor ingrese el nivel que desea consultar: ");
    let numCase = 1;
    switch (numCase) {
      case 1:
        try {
          const caso1 = await casoPrueba1Cache();
          return caso1;
        } catch (error) {
          console.log(error);
        }
        break;
      case 2:
        const caso2 = await casoPrueba2(id);
        return caso2;
      case 3:
        const caso3 = await casoPrueba3(id);
        return caso3;
      case 4:
        const caso4 = await casoPrueba4(id);
        return caso4;
      case 5:
        const caso5 = await casoPrueba5(id);
        return caso5;
      default:
        console.log("Porfavor solo ingrese un valor del 1 al 5");
        break;
    }
  }
};

//casoPrueba();
casoPruebaCache();

