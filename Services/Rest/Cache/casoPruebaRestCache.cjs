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
  const { data, requests1 } = await getCasoPrueba1RestCache(first);

  const gameId = data.map((resp) => resp.game_id);
  for (const game_id of gameId) {
    const { data, requests } = await getVideosByGameCache(game_id, first2);
    numPeticiones += requests;
    objetos = [...objetos, ...data];
  }
  //TIEMPO
  const totalPeticiones = requests1 + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  return { data2: objetos, time2: tiempo, requests2: totalPeticiones };
};

const getCasoPrueba3RestCache = async (first, first2, first3) => {
  const t1 = performance.now();
  let allData = [];
  let numPeticiones = 0;
  console.log(first,first2,first3)
  const { data2, requests2 } = await getCasoPrueba2RestCache(first, first2);

  const userId = data2.map((dataVideo) => dataVideo.user_id);

  for (const _id of userId) {
    const { data, requests } = await getClipsByUserCache(_id, first3);
    allData = [...allData, ...data];
    numPeticiones += requests;
  }

  //TIEMPO
  const totalPeticiones = requests2 + numPeticiones;

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

  const broadcasterId = data3.map(
    (dataClips) => dataClips.broadcaster_id
  );

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
