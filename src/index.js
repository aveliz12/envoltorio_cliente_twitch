import {
  casoPrueba1,
  casoPrueba2,
  casoPrueba3,
  casoPrueba4,
  casoPrueba5,
} from "../Services/TestCases.js";

//CACHE
import { casoPrueba1Cache } from "../Services/Cache/TestCasesCache.js";

import Storage from "node-storage";
const store = new Storage("./store");
//import { getToken } from "../Services/ApiRest.js";
import promptSync from "prompt-sync";
import inquirer from "inquirer";
const prompt = promptSync();

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

// const casoPruebaCache = async () => {
//   if (token === "") {
//     console.log("Genere un token porfavor");
//     return;
//   } else {
//     console.log(`Su token generado es: ${token}`);
// console.log(
//   "Lista de casos.\n" +
//     "1- 1° Nivel: Streams en vivo\n" +
//     "2- 2° Nivel: Video por juego\n" +
//     "3- 3° Nivel: Información del canal\n" +
//     "4- 4° Nivel: Clips por usuario\n" +
//     "5- 5° Nivel: Informacion del juego\n" +
//     "Ingrese el caso que desee consultar: "
// );
//let text = prompt("Por favor ingrese el nivel que desea consultar: ");
//     let numCase = 1;
//     switch (numCase) {
//       case 1:
//         try {
//           const caso1 = await casoPrueba1Cache();
//           return caso1;
//         } catch (error) {
//           console.log(error);
//         }
//         break;
//       case 2:
//         const caso2 = await casoPrueba2(id);
//         return caso2;
//       case 3:
//         const caso3 = await casoPrueba3(id);
//         return caso3;
//       case 4:
//         const caso4 = await casoPrueba4(id);
//         return caso4;
//       case 5:
//         const caso5 = await casoPrueba5(id);
//         return caso5;
//       default:
//         console.log("Porfavor solo ingrese un valor del 1 al 5");
//         break;
//     }
//   }
// };

//CACHE
const menuOptions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: "1° Nivel: Streams en vivo",
      },
      {
        value: "2",
        name: "2° Nivel: Video por juego",
      },
      {
        value: "3",
        name: "3° Nivel: Información del canal",
      },
      {
        value: "4",
        name: "4° Nivel: Clips por usuario",
      },
      {
        value: "5",
        name: "5° Nivel: Informacion del juego",
      },
      {
        value: "0",
        name: "Salir",
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.log(`Su token generado es: ${token}`);
  console.log("=================================");
  console.log("Seleccione una opcion: ");
  console.log("=================================");

  const { opcion } = await inquirer.prompt(menuOptions);

  return opcion;
};

const casoPruebaCache = async () => {
  if (token === "") {
    console.log("Genere un token porfavor");
    return;
  } else {
    let opt = "";

    do {
      opt = await inquirerMenu();

      switch (opt) {
        case '1':
          try {
            const caso1 = await casoPrueba1Cache();
            //return caso1;
          } catch (error) {
            console.log(error);
          }
          break;
        case '2':
          const caso2 = await casoPrueba2(id);
          return caso2;
        case '3':
          const caso3 = await casoPrueba3(id);
          return caso3;
        case '4':
          const caso4 = await casoPrueba4(id);
          return caso4;
        case '5':
          const caso5 = await casoPrueba5(id);
          return caso5;
        default:
          break;
      }
    } while (opt !== "0");
  }
};

//casoPrueba();
casoPruebaCache();
