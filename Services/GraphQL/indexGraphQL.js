import pkg from "../Menu/inquirerMenu.cjs";
import pkgGraphQL from "./graphQL.cjs";

const { inquirerMenu } = pkg;
const {
  casoPrueba1GraphQL,
  casoPrueba2GraphQL,
  casoPrueba3GraphQL,
  casoPrueba4GraphQL,
  casoPrueba5GraphQL,
} = pkgGraphQL;

import Storage from "node-storage";
const store = new Storage("./store");

const token = store.get("token");

export const casoPruebaGraphQL = async () => {
  console.log("***********************GRAPHQL TWITCH*******************".magenta);
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
            await casoPrueba1GraphQL();
          } catch (error) {
            console.log(error);
          }
          break;
        case "2":
          await casoPrueba2GraphQL();
          break;
        case "3":
          await casoPrueba3GraphQL();
          break;
        case "4":
          await casoPrueba4GraphQL();
          break;
        case "5":
          await casoPrueba5GraphQL();
          break;
        default:
          break;
      }
    } while (opt !== "0");
  }
};
