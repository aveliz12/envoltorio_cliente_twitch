//CACHE
import fetch from "node-fetch";
import pkg from "@apollo/client/core/core.cjs";
const { ApolloClient, InMemoryCache, HttpLink } = pkg;
import {
  DATA_LIVESTREAMS,
  DATA_VIDEOSBYGAME,
  DATA_INFORMATIONCHANNEL,
  DATA_CLIPSBYUSER,
  DATA_INFORMATIONGAME,
  DATA_CASOPRUEBACACHE,
} from "./querys.js";
import { performance } from "perf_hooks";

/*____________________CACHE______________________________*/

const uri = "http://localhost:4000/";

const client = new ApolloClient({
  link: new HttpLink({ uri, fetch }),
  cache: new InMemoryCache(),
});

export const casoPrueba1Cache = async () => {
  const t1 = performance.now();
  const response = await client.query({
    query: DATA_LIVESTREAMS,
  });
  const t2 = performance.now();
  let milisegundos = (t2 - t1).toFixed(2);
  console.log("NIVEL 1");
  console.log(`La consulta desde cache tardó: ${milisegundos} milisegundos`);

  //console.log("Datos de Live Streams desde caché".red, response.data);
};

export const casoPrueba2Cache = async () => {
  const t1 = performance.now();

  const response = await client.query({
    query: DATA_VIDEOSBYGAME,
    variables: {
      id: "32982",
    },
  });
  const t2 = performance.now();
  let milisegundos = (t2 - t1).toFixed(2);
  console.log("NIVEL 2");
  console.log(`La consulta desde cache tardó: ${milisegundos} milisegundos`);

  //console.log("Datos de Videos por juego desde caché".red, response.data);
};

export const casoPrueba3Cache = async () => {
  const t1 = performance.now();

  const response = await client.query({
    query: DATA_CLIPSBYUSER,
    variables: {
      id: "719332376",
    },
  });
  const t2 = performance.now();
  let milisegundos = (t2 - t1).toFixed(2);
  console.log("NIVEL 4");
  console.log(`La consulta desde cache tardó: ${milisegundos} milisegundos`);
  //console.log("Datos de clips por usuario desde caché".red, response.data);
};

export const casoPrueba4Cache = async () => {
  const t1 = performance.now();

  const response = await client.query({
    query: DATA_INFORMATIONCHANNEL,
    variables: {
      id: "719332376",
    },
  });
  const t2 = performance.now();
  let milisegundos = (t2 - t1).toFixed(2);
  console.log("NIVEL 3");
  console.log(`La consulta desde cache tardó: ${milisegundos} milisegundos`);
  //console.log("Datos de Informacion del canal desde cache".red, response.data);
};


export const casoPrueba5Cache = async () => {
  const t1 = performance.now();

  const response = await client.query({
    query: DATA_INFORMATIONGAME,
    variables: {
      id: "32982",
    },
  });
  const t2 = performance.now();
  let milisegundos = (t2 - t1).toFixed(2);
  console.log("NIVEL 2¿5");
  console.log(`La consulta desde cache tardó: ${milisegundos} milisegundos`);
  //console.log("Datos de Informacion de juego desde caché".red, response.data);
};

export const casoPruebaCache = async () => {
  const t1 = performance.now();

  const response = await client.query({
    query: DATA_CASOPRUEBACACHE,
    variables: {
      first: 10,
    },
  });
  const t2 = performance.now();
  let milisegundos = (t2 - t1).toFixed(2);
  console.log("NIVEL 2");
  console.log(`La consulta desde cache tardó: ${milisegundos} milisegundos`);
  //console.log(response.data);
};
