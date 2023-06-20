const {
  getLiveStreamsCache,
  getVideosByGameCache,
  getClipsByUserCache,
  getChannelInformationCache,
  getGameInformationCache,
} = require("./restCacheApollo.cjs");
const { performance } = require("perf_hooks");
const fetch = require("node-fetch");
globalThis.fetch = fetch;

/*____________________REST CON CACHE______________________________*/

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

//CASO DE PRUEBA 1 CACHE: LIVE STREAMS
const getCasoPrueba1RestCache = async (first) => {
  const t1 = performance.now();
  const { data, requests } = await getLiveStreamsCache(first);
  const t2 = performance.now();
  const tiempo = getTime(t1, t2);

  const numPeticiones = requests;
  return { data: data, time: tiempo, requests1: numPeticiones };
};

//CASO DE PRUEBA 2 CACHE: VIDEOS BY GAME
const getCasoPrueba2RestCache = async (first, first2) => {
  const t1 = performance.now();
  let numPeticiones = 0;
  let objetos = [];
  let totalDataVideos = 0;
  let datCaso1, requestsCaso1;
  do {
    const casi1Cache = await getCasoPrueba1RestCache(first);
    datCaso1 = casi1Cache.data;
    requestsCaso1 = casi1Cache.requests1;
    let idFound = false;

    const gameId = datCaso1.map((resp) => resp.game_id);
    for (const game_id of gameId) {
      if (game_id.trim() === "") {
        continue;
      }
      const { data, requests } = await getVideosByGameCache(game_id, first2);
      if (data.length >= first2 && data.length > 0) {
        objetos.push(...data);
        totalDataVideos++;
        numPeticiones += requests;
        idFound = true;
      }
      if (totalDataVideos >= first) {
        break;
      }
    }
    if (!idFound) {
      console.log(
        "No se encontraron suficientes datos con los IDs actuales. Consultando con nuevos IDs..."
      );
    }
  } while (totalDataVideos < first);
  if (totalDataVideos > first) {
    //se utiliza el método slice para reducir la longitud del arreglo dataVideosForCaso2 a first elementos
    dataForCaso2 = dataForCaso2.slice(0, first);
    totalDataVideos = first;
  }
  //TIEMPO
  const totalPeticiones = requestsCaso1 + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  return { data2: objetos, time2: tiempo, requests2: totalPeticiones };
};

const getCasoPrueba3RestCache = async (first, first2, first3) => {
  const t1 = performance.now();
  let allData = [];
  let totalDataClips = 0;
  let numPeticiones = 0;
  let dataCaso2, requestCaso2;

  do {
    const result = await getCasoPrueba2RestCache(first, first2);
    dataCaso2 = result.data2;
    requestCaso2 = result.requests2;
    let idFound = false;

    const userId = dataCaso2.map((dataVideo) => dataVideo.user_id);

    for (const _id of userId) {
      const { data, requests } = await getClipsByUserCache(_id, first3);
      if (data.length >= first3 && data.length > 0) {
        allData.push(...data);
        totalDataClips++;
        numPeticiones += requests;
        idFound = true;
      }

      if (totalDataClips >= dataCaso2.length) {
        break;
      }
    }
    if (!idFound) {
      console.log(
        "No se encontraron suficientes datos con los IDs actuales. Consultando con nuevos IDs..."
      );
    }
  } while (totalDataClips < dataCaso2.length);
  if (totalDataClips > dataCaso2.length) {
    dataForCaso3 = dataForCaso3.slice(0, dataCaso2.length);
    totalDataClips = dataCaso2.length;
  }
  //TIEMPO
  const totalPeticiones = requestCaso2 + numPeticiones;

  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  return { data3: allData, time3: tiempo, requests3: totalPeticiones };
};

const getCasoPrueba4RestCache = async (first, first2, first3) => {
  const t1 = performance.now();
  let numPeticiones = 0;
  let allData = [];
  const { data3, requests3 } = await getCasoPrueba3RestCache(
    first,
    first2,
    first3
  );

  const broadcasterId = data3.map((dataClips) => dataClips.broadcaster_id);

  for (const _id of broadcasterId) {
    const { data, requests } = await getChannelInformationCache(_id);
    allData = [...allData, ...data];
    numPeticiones += requests;
  }

  //TIEMPO
  const totalPeticiones = requests3 + numPeticiones;

  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  return { data4: allData, time4: tiempo, requests4: totalPeticiones };
};

const getCasoPrueba5RestCache = async (first, first2, first3) => {
  const t1 = performance.now();
  let numPeticiones = 0;
  let allData = [];
  const { data4, requests4 } = await getCasoPrueba4RestCache(
    first,
    first2,
    first3
  );
  const gameId = data4.map((dataGame) => dataGame.game_id);
  for (const _id of gameId) {
    const { dataGames, requestsGames } = await getGameInformationCache(_id);
    allData = [...allData, ...dataGames];
    numPeticiones += requestsGames;
  }

  //TIEMPO
  const totalPeticiones = requests4 + numPeticiones;

  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  return {
    data5: allData,
    time5: tiempo,
    requests5: totalPeticiones,
  };
};

module.exports = {
  getCasoPrueba1RestCache,
  getCasoPrueba2RestCache,
  getCasoPrueba3RestCache,
  getCasoPrueba4RestCache,
  getCasoPrueba5RestCache,
};
