const {
  DATA_CASOPRUEBA1,
  DATA_CASOPRUEBA2,
  DATA_CASOPRUEBA3,
  DATA_CASOPRUEBA4,
  DATA_CASOPRUEBA5,
} = require("./Cache/querys.cjs");
const fetch = require("node-fetch");

const {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} = require("@apollo/client/core");
const { performance } = require("perf_hooks");

const uri = "http://localhost:4000/";

/*____________________GRAPHQL SIN CACHE______________________________*/

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  link: new HttpLink({ uri, fetch }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

//LIVE STREAMS
const casoPrueba1GraphQL = async () => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA1,
  });

  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log("<=================NIVEL 1 GRAPHQL=================>");
  console.log(response.data.length);
  console.log(`La consulta graphql tardó: ${segundos} segundos`);
};

//VIDEOS BY GAME
const casoPrueba2GraphQL = async () => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA2,
  });

  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log("<=================NIVEL 2 GRAPHQL=================>");
  console.log(response.data.length);
  console.log(`La consulta graphql tardó: ${segundos} segundos`);
};

//CLIPS BY USER
const casoPrueba3GraphQL = async () => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA3,
  });

  console.log(response.data.length);

  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log("<=================NIVEL 3 GRAPHQL=================>");
  console.log(`La consulta graphql tardó: ${segundos} segundos`);
};

//INFORMATION CHANNEL
const casoPrueba4GraphQL = async () => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA4,
  });

  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log("<=================NIVEL 4 GRAPHQL=================>");
  console.log(response.data.length);
  console.log(`La consulta graphql tardó: ${segundos} segundos`);
};

//INFORMATION GAME
const casoPrueba5GraphQL = async () => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA5,
  });

  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log("<=================NIVEL 5 GRAPHQL=================>");
  console.log(response.data.length);
  console.log(`La consulta graphql tardó: ${segundos} segundos`);
};

module.exports = {
  casoPrueba1GraphQL,
  casoPrueba2GraphQL,
  casoPrueba3GraphQL,
  casoPrueba4GraphQL,
  casoPrueba5GraphQL,
};
