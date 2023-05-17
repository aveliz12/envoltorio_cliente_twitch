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
    let limitNivel1 = 0,
      limitNivel2 = 0,
      limitNivel3 = 0,
      limitNivel4 = 0,
      limitNivel5 = 0;
    do {
      opt = await inquirerMenu();

      switch (opt) {
        case "1":
          try {
            console.log(
              "<=================NIVEL 1 GRAPHQL-CACHE=================>".red
                .bold
            );
            limitNivel1 = await distribucionDatosCaso1();
            console.log(
              "Cantidad de datos requeridos (Distribución) | Nivel 1: ",
              limitNivel1
            );
            const time = await casoPrueba1Cache(limitNivel1);
            imprimirDatos(time);
          } catch (error) {
            console.log(error);
          }
          break;
        case "2":
          try {
            console.log(
              "<=================NIVEL 2 GRAPHQL-CACHE=================>".red
                .bold
            );
            await distribucionDatosCaso2().then((resp) => {
              limitNivel1 = resp.limite;
              limitNivel2 = resp.limite2;
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 2: ",
                resp
              );
            });
            const time = await casoPrueba2Cache(limitNivel1, limitNivel2);
            imprimirDatos(time);
          } catch (error) {
            console.log(error);
          }
          break;
        case "3":
          try {
            console.log(
              "<=================NIVEL 3 GRAPHQL-CACHE=================>".red
                .bold
            );
            await distribucionDatosCaso3().then((resp) => {
              limitNivel1 = resp.limite;
              limitNivel2 = resp.limite2;
              limitNivel3 = resp.limite3;
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 3: ",
                resp
              );
            });
            const time = await casoPrueba3Cache(
              limitNivel1,
              limitNivel2,
              limitNivel3
            );
            imprimirDatos(time);
          } catch (error) {
            console.log(error);
          }
          break;
        case "4":
          try {
            console.log(
              "<=================NIVEL 4 GRAPHQL-CACHE=================>".red
                .bold
            );
            await distribucionDatosCaso4().then((resp) => {
              limitNivel1 = resp.limite;
              limitNivel2 = resp.limite2;
              limitNivel3 = resp.limite3;
              limitNivel4 = resp.limite4;
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 4: ",
                resp
              );
            });
            const time = await casoPrueba4Cache(
              limitNivel1,
              limitNivel2,
              limitNivel3,
              limitNivel4
            );
            imprimirDatos(time);
          } catch (error) {
            console.log(error);
          }
          break;
        case "5":
          try {
            console.log(
              "<=================NIVEL 5 GRAPHQL-CACHE=================>".red
                .bold
            );
            await distribucionDatosCaso5().then((resp) => {
              limitNivel1 = resp.limite;
              limitNivel2 = resp.limite2;
              limitNivel3 = resp.limite3;
              limitNivel4 = resp.limite4;
              limitNivel5 = resp.limite5;
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 5: ",
                resp
              );
            });
            const time = await casoPrueba5Cache(
              limitNivel1,
              limitNivel2,
              limitNivel3,
              limitNivel4,
              limitNivel5
            );

            imprimirDatos(time);
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
