import pkg from "../Menu/inquirerMenu.cjs";
import pkgGraphQL from "./graphQL.cjs";
import pkgDistribucion from "../Menu/distribucion.cjs";
import Storage from "node-storage";
const { distribucionDatos } = pkgDistribucion;
const { inquirerMenu } = pkg;
const {
  casoPrueba1GraphQL,
  casoPrueba2GraphQL,
  casoPrueba3GraphQL,
  casoPrueba4GraphQL,
  casoPrueba5GraphQL,
} = pkgGraphQL;

const store = new Storage("./store");

const token = store.get("token");

export const casoPruebaGraphQL = async () => {
  console.log(
    "***********************ENVOLTORIO GRAPHQL TWITCH*******************"
      .bgMagenta.bold
  );

  if (token === "") {
    console.log("Genere un token por favor.");
    return;
  } else {
    console.log(`Su token generado es: ${token}`.bold);
    let first = 0;
    let opt = " ";
    do {
      opt = await inquirerMenu();

      switch (opt) {
        case "1":
          try {
            first = await distribucionDatos();
            await casoPrueba1GraphQL(first);
          } catch (error) {
            console.log(error);
          }
          break;
        case "2":
          try {
            await casoPrueba2GraphQL();
          } catch (error) {
            console.log(error);
          }
          break;
        case "3":
          try {
            await casoPrueba3GraphQL();
          } catch (error) {
            console.log(error);
          }
          break;
        case "4":
          try {
            await casoPrueba4GraphQL();
          } catch (error) {
            console.log(error);
          }
          break;
        case "5":
          try {
            await casoPrueba5GraphQL();
          } catch (error) {
            console.log(error);
          }
          break;
        default:
          break;
      }
    } while (opt !== "0");
  }
};
