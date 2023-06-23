import {
  casoPrueba1Cache,
  casoPrueba2Cache,
  casoPrueba3Cache,
  casoPrueba4Cache,
  casoPrueba5Cache,
} from "./GraphQLCache.js";
import Storage from "node-storage";
import pkg from "../../Menu/inquirerMenu.cjs";
import pkgDistribucion from "../../Menu/distribucion.cjs";
const {
  distribucionDatosCaso1,
  distribucionDatosCaso2,
  distribucionDatosCaso3,
  distribucionDatosCaso4,
  distribucionDatosCaso5,
  distribucionDatosCaso2GraphQL,
  distribucionDatosCaso3GraphQL,
} = pkgDistribucion;
const { inquirerMenu } = pkg;
const store = new Storage("./store");
const token = store.get("token");

const imprimirDatos = (time) => {
  console.log(`Tiempo: ${time.milisegundos} milisegundos.`.underline);
  console.log(`Tiempo: ${time.segundos} segundos.`.underline);
  console.log(`Tiempo: ${time.minutos} minutos.`.underline);
};

export const casoPruebaGraphQLCache = async () => {
  console.log(
    "*******************ENVOLTORIO GRAPHQL TWITCH CON CACHE*******************"
      .bgMagenta.bold
  );

  if (token === "") {
    console.log("Genere un token porfavor");
    return;
  } else {
    let opt = "";
    console.log(`Su token generado es: ${token}`.bold);
    try {
      do {
        opt = await inquirerMenu();

        switch (opt) {
          case "1":
            console.log(
              "<=================NIVEL 1 GRAPHQL-CACHE=================>".red
                .bold
            );
            await distribucionDatosCaso1().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 1: ",
                resp
              );
              const { time } = await casoPrueba1Cache(resp);
              imprimirDatos(time);
            });

            break;
          case "2":
            console.log(
              "<=================NIVEL 2 GRAPHQL-CACHE=================>".red
                .bold
            );
            await distribucionDatosCaso2GraphQL().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 2: ",
                resp
              );
              const time = await casoPrueba2Cache(
                resp.limiteNivel1,
                resp.limiteNivel2
              );
              imprimirDatos(time);
            });

            break;
          case "3":
            console.log(
              "<=================NIVEL 3 GRAPHQL-CACHE=================>".red
                .bold
            );
            await distribucionDatosCaso3GraphQL().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 3: ",
                resp
              );
              const time = await casoPrueba3Cache(
                resp.limiteNivel1,
                resp.limiteNivel2,
                resp.limiteNivel3
              );
              imprimirDatos(time);
            });

            break;
          case "4":
            console.log(
              "<=================NIVEL 4 GRAPHQL-CACHE=================>".red
                .bold
            );
            await distribucionDatosCaso4().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 4: ",
                resp
              );
              const time = await casoPrueba4Cache(
                resp.limiteNivel1,
                resp.limiteNivel2,
                resp.limiteNivel3
              );
              imprimirDatos(time);
            });

            break;
          case "5":
            console.log(
              "<=================NIVEL 5 GRAPHQL-CACHE=================>".red
                .bold
            );
            await distribucionDatosCaso5().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 5: ",
                resp
              );
              const time = await casoPrueba5Cache(
                resp.limiteNivel1,
                resp.limiteNivel2,
                resp.limiteNivel3
              );

              imprimirDatos(time);
            });

            break;
          default:
            break;
        }
      } while (opt !== "0");
    } catch (error) {
      console.log(error);
    }
  }
};
