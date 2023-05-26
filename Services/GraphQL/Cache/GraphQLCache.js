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
  link: new HttpLink({ uri, fetch }),
  cache: new InMemoryCache(),
});

//LIVE STREAMS
export const casoPrueba1Cache = async (limitNivel1) => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA1,
    variables: {
      limitNivel1,
    },
  });
  const dataLiveStreams = response.data.getCasosPruebasLiveStreams;
  const t2 = performance.now();

  const tiempo = getTime(t1, t2);
  console.log(
    `Datos del nivel 1 GraphQL con Cache: ${dataLiveStreams.length}.`.underline
  );
  return { data: dataLiveStreams, time: tiempo };
};

//Obtener iDs que contengan la cantidad de datos establecida en el nivel 2
const getDataForCaso2Cache = async (limitNivel1, limitNivel2) => {
  try {
    const idsWithMoreData = [];
    let totalData = 0;

    while (totalData < limitNivel1) {
      const { data } = casoPrueba1Cache(limitNivel1);
      console.log(data);
      const ids = data.map((item) => item.id);

      const responseNivel2 = await client.query({
        query: DATA_CASOPRUEBA2,
        variables: {
          limitNivel1,
          limitNivel2,
        },
      });

      ids.forEach((id) => {
        const numData = responseNivel2.data.getCasosPruebasLiveStreams.filter(
          (data) => data.id === id
        ).length;

        if (numData >= limitNivel2 && !idsWithMoreData.includes(id)) {
          idsWithMoreData.push(id);
          totalData++;
        }
      });

      if (data.length === 0) {
        break;
      }
    }

    console.log(
      `IDs con más datos que el límite (${limitNivel2}):`,
      idsWithMoreData
    );

    return idsWithMoreData;
  } catch (error) {
    console.log(error);
  }
};

//VIDEOS BY GAME
export const casoPrueba2Cache = async (limitNivel1, limitNivel2) => {
  const t1 = performance.now();

  const iDs = getDataForCaso2Cache(limitNivel1, limitNivel2);
  console.log(iDs);
  //CONSULTA
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
    `Datos del nivel 2 GraphQL con Cache: ${response.data.getCasosPruebasLiveStreams.length}.`
      .underline
  );

  return tiempo;
};

//CLIPS BY USER
export const casoPrueba3Cache = async (
  limitNivel1,
  limitNivel2,
  limitNivel3
) => {
  const t1 = performance.now();

  //CONSULTA
  const response = await client.query({
    query: DATA_CASOPRUEBA3,
    variables: {
      limitNivel1,
      limitNivel2,
      limitNivel3,
    },
  });
  const t2 = performance.now();
  const tiempo = getTime(t1, t2);
  console.log(
    `Datos del nivel 3 GraphQL con Cache: ${response.data.getCasosPruebasLiveStreams.length}.`
      .underline
  );

  return tiempo;
};

export const casoPrueba4Cache = async (
  limitNivel1,
  limitNivel2,
  limitNivel3,
  limitNivel4
) => {
  const t1 = performance.now();

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
    `Datos del nivel 4 GraphQL con Cache: ${response.data.getCasosPruebasLiveStreams.length}.`
      .underline
  );
  return tiempo;
};

export const casoPrueba5Cache = async (
  limitNivel1,
  limitNivel2,
  limitNivel3,
  limitNivel4,
  limitNivel5
) => {
  const t1 = performance.now();

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
    `Datos del nivel 5 GraphQL con Cache: ${response.data.getCasosPruebasLiveStreams.length}.`
      .underline
  );
  return tiempo;
};
