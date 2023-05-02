//CACHE
import fetch from "node-fetch";
import pkg from "@apollo/client/core/core.cjs";
const { ApolloClient, InMemoryCache, HttpLink } = pkg;
import pkgDataCasos from "./querys.cjs";
const {
  DATA_CASOPRUEBA1,
  DATA_CASOPRUEBA2,
  DATA_CASOPRUEBA3,
  DATA_CASOPRUEBA4,
  DATA_CASOPRUEBA5,
} = pkgDataCasos;
import { performance } from "perf_hooks";

/*____________________GRAPHQL CON CACHE______________________________*/

const uri = "http://localhost:4000/";

const client = new ApolloClient({
  link: new HttpLink({ uri, fetch }),
  cache: new InMemoryCache(),
});

export const casoPrueba1Cache = async (first) => {
  const t1 = performance.now();
  const response = await client.query({
    query: DATA_CASOPRUEBA1,
    variables: {
      "first": first,
    },
  });
  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log(
    "<=================NIVEL 1 GRAPHQL-CACHE=================>".red.bold
  );
  console.log(`La cantidad de datos es: ${response.data.getCasosPruebasLiveStreams.length}.`)
  console.log(
    `La consulta desde cache de graphql tardó: ${segundos} segundos`.red
  );
};

export const casoPrueba2Cache = async () => {
  const t1 = performance.now();

  const response = await client.query({
    query: DATA_CASOPRUEBA2,
  });
  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log(
    "<=================NIVEL 2 GRAPHQL-CACHE=================>".red.bold
  );
  console.log(
    `La consulta desde cache de graphql tardó: ${segundos} segundos`.red
  );
};

export const casoPrueba3Cache = async () => {
  const t1 = performance.now();

  const response = await client.query({
    query: DATA_CASOPRUEBA3,
  });
  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log(
    "<=================NIVEL 3 GRAPHQL-CACHE=================>".red.bold
  );
  console.log(
    `La consulta desde cache de graphql tardó: ${segundos} segundos`.red
  );
};

export const casoPrueba4Cache = async () => {
  const t1 = performance.now();

  const response = await client.query({
    query: DATA_CASOPRUEBA4,
  });
  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log(
    "<=================NIVEL 4 GRAPHQL-CACHE=================>".red.bold
  );
  console.log(
    `La consulta desde cache de graphql tardó: ${segundos} segundos`.red
  );
};

export const casoPrueba5Cache = async () => {
  const t1 = performance.now();

  const response = await client.query({
    query: DATA_CASOPRUEBA5,
  });
  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log(
    "<=================NIVEL 5 GRAPHQL-CACHE=================>".red.bold
  );
  console.log(
    `La consulta desde cache de graphql tardó: ${segundos} segundos`.red
  );
};
