import pkg from "../Menu/inquirerMenu.cjs";
import pkgGraphQL from "./graphQL.cjs";
import Storage from "node-storage";
import pkgDistribucion from "../Menu/distribucion.cjs";
const {
  distribucionDatosCaso1,
  distribucionDatosCaso2,
  distribucionDatosCaso3,
  distribucionDatosCaso4,
  distribucionDatosCaso5,
} = pkgDistribucion;
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
const imprimirDatos = (time) => {
  console.log(`Tiempo: ${time.milisegundos} milisegundos.`.underline);
  console.log(`Tiempo: ${time.segundos} segundos.`.underline);
  console.log(`Tiempo: ${time.minutos} minutos.`.underline);
};
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
    let limitNivel1 = 0,
      limitNivel2 = 0,
      limitNivel3 = 0,
      limitNivel4 = 0,
      limitNivel5 = 0;
    let opt = " ";
    do {
      opt = await inquirerMenu();

      switch (opt) {
        case "1":
          try {
            console.log(
              "<=================NIVEL 1 GRAPHQL=================>".red.bold
            );

            limitNivel1 = await distribucionDatosCaso1();
            console.log(
              "Cantidad de datos requeridos (Distribución) | Nivel 1: ",
              limitNivel1
            );
            const time = await casoPrueba1GraphQL(limitNivel1);
            imprimirDatos(time);
          } catch (error) {
            console.log(error);
          }
          break;
        case "2":
          try {
            console.log(
              "<=================NIVEL 2 GRAPHQL=================>".red.bold
            );

            await distribucionDatosCaso2().then((resp) => {
              limitNivel1 = resp.limite;
              limitNivel2 = resp.limite2;
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 2: ",
                resp
              );
            });

            const time = await casoPrueba2GraphQL(limitNivel1, limitNivel2);
            imprimirDatos(time);
          } catch (error) {
            console.log(error);
          }
          break;
        case "3":
          try {
            console.log(
              "<=================NIVEL 3 GRAPHQL=================>".red.bold
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
            const time = await casoPrueba3GraphQL(
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
              "<=================NIVEL 4 GRAPHQL=================>".red
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
            const time = await casoPrueba4GraphQL(
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
              "<=================NIVEL 5 GRAPHQL=================>".red.bold
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
            const time = await casoPrueba5GraphQL(
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
