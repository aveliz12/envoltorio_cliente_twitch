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
const axios = require("axios");
const { buildAxiosFetch } = require("@lifeomic/axios-fetch");

/* Configuración del tiempo de espera en apollo client */
const instanceAxios = axios.create({
  timeout: 7200000,
});
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

const getTime = (t1, t2) => {
  const milisegundos = (t2 - t1).toFixed(3);
  const segundos = ((t2 - t1) / 1000).toFixed(3);
  const minutos = ((t2 - t1) / 60000).toFixed(3);
  const tiempo = {
    milisegundos,
    segundos,
    minutos,
  };

  return tiempo;
};

const client = new ApolloClient({
  link: new HttpLink({ uri, fetch: buildAxiosFetch(instanceAxios) }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

//LIVE STREAMS
const casoPrueba1GraphQL = async (limitNivel1) => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA1,
    variables: {
      limitNivel1,
    },
  });
  let t2 = performance.now();

  const tiempo = getTime(t1, t2);

  console.log(
    `Datos del nivel 1 GraphQL: ${response.data.getCasosPruebasLiveStreams.length}.`
      .underline
  );
  return tiempo;
};

//VIDEOS BY GAME
const casoPrueba2GraphQL = async (limitNivel1, limitNivel2) => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA2,
    variables: {
      limitNivel1,
      limitNivel2,
    },
  });

  const t2 = performance.now();
  const tiempo = getTime(t1, t2);
  console.log(
    `Datos del nivel 2 GraphQL: ${response.data.getCasosPruebasLiveStreams.length}.`
      .underline
  );
  return tiempo;
};

//CLIPS BY USER
const casoPrueba3GraphQL = async (limitNivel1, limitNivel2, limitNivel3) => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA3,
    variables: {
      limitNivel1,
      limitNivel2,
      limitNivel3,
    },
  });
  console.log(response.data.getCasosPruebasLiveStreams.data);
  const t2 = performance.now();
  const tiempo = getTime(t1, t2);

  console.log(
    `Datos del nivel 3 GraphQL: ${response.data.getCasosPruebasLiveStreams.length}.`
      .underline
  );
  return tiempo;
};

//INFORMATION CHANNEL
const casoPrueba4GraphQL = async (
  limitNivel1,
  limitNivel2,
  limitNivel3,
  limitNivel4
) => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA4,
    variables: {
      limitNivel1,
      limitNivel2,
      limitNivel3,
      limitNivel4,
    },
  });

  const t2 = performance.now();
  const tiempo = getTime(t1, t2);
  console.log(
    `Datos del nivel 4 GraphQL: ${response.data.getCasosPruebasLiveStreams.length}.`
      .underline
  );
  return tiempo;
};

//INFORMATION GAME
const casoPrueba5GraphQL = async (
  limitNivel1,
  limitNivel2,
  limitNivel3,
  limitNivel4,
  limitNivel5
) => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA5,
    variables: {
      limitNivel1,
      limitNivel2,
      limitNivel3,
      limitNivel4,
      limitNivel5,
    },
  });

  const t2 = performance.now();
  const tiempo = getTime(t1, t2);
  console.log(
    `Datos del nivel 5 GraphQL: ${response.data.getCasosPruebasLiveStreams.length}.`
      .underline
  );
  return tiempo;
};

module.exports = {
  casoPrueba1GraphQL,
  casoPrueba2GraphQL,
  casoPrueba3GraphQL,
  casoPrueba4GraphQL,
  casoPrueba5GraphQL,
};
