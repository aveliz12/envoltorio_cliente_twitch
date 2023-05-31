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
    let opt = " ";
    try {
      do {
        opt = await inquirerMenu();

        switch (opt) {
          case "1":
            console.log(
              "<=================NIVEL 1 GRAPHQL=================>".red.bold
            );

            await distribucionDatosCaso1().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 1: ",
                resp
              );
              const time = await casoPrueba1GraphQL(resp);
              imprimirDatos(time);
            });

            break;
          case "2":
            console.log(
              "<=================NIVEL 2 GRAPHQL=================>".red.bold
            );
            await distribucionDatosCaso2().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 2: ",
                resp
              );
              const time = await casoPrueba2GraphQL(resp.limiteNivel1, resp.limiteNivel2);
              imprimirDatos(time);
            });

            break;
          case "3":
            console.log(
              "<=================NIVEL 3 GRAPHQL=================>".red.bold
            );
            await distribucionDatosCaso3().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 3: ",
                resp
              );
              const time = await casoPrueba3GraphQL(
                resp.limiteNivel1,
                resp.limiteNivel2,
                resp.limiteNivel3
              );
              imprimirDatos(time);
            });

            break;
          case "4":
            console.log(
              "<=================NIVEL 4 GRAPHQL=================>".red
            );
            await distribucionDatosCaso4().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 4: ",
                resp
              );
              const time = await casoPrueba4GraphQL(
                resp.limiteNivel1,
                resp.limiteNivel2,
                resp.limiteNivel3,
                //resp.limiteNivel4
              );
              imprimirDatos(time);
            });

            break;
          case "5":
            console.log(
              "<=================NIVEL 5 GRAPHQL=================>".red.bold
            );
            await distribucionDatosCaso5().then(async (resp) => {
              console.log(
                "Cantidad de datos requeridos (Distribución) | Nivel 5: ",
                resp
              );
              const time = await casoPrueba5GraphQL(
                resp.limiteNivel1,
                resp.limiteNivel2,
                resp.limiteNivel3,
                // resp.limiteNivel4,
                // resp.limiteNivel5
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
