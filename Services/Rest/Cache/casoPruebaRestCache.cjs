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

  console.log(`Datos Nivel 1 Cache REST: ${data.length}.`.underline);
  return { data: data, time: tiempo, requests1: numPeticiones };
};

const getCasoPrueba2RestCache = async (first, first2) => {
  const t1 = performance.now();
  let numPeticiones = 0;
  let objetos = [];
  const { data, requests1 } = await getCasoPrueba1RestCache(first);
  const dataLiveStreams = data;
  const gameId = dataLiveStreams.map((resp) => resp.game_id);

  for (const game_id of gameId) {
    const { data, requests } = await getVideosByGameCache(game_id, first2);
    numPeticiones += requests;
    objetos = [...objetos, ...data];
  }

  //TIEMPO
  const totalPeticiones = requests1 + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  console.log(`Datos Nivel 2 Cache REST: ${objetos.length}.`.underline);

  return { data: objetos, time2: tiempo, requests2: totalPeticiones };
};

const getCasoPrueba3RestCache = async (first, first2, first3) => {
  const t1 = performance.now();
  let allData = [];
  let numPeticiones = 0;
  const { data, requests2 } = await getCasoPrueba2RestCache(first, first2);
  const datavideosGame = data;

  const userId = datavideosGame.map((dataVideo) => dataVideo.user_id);

  for (const _id of userId) {
    const { data, requests } = await getClipsByUserCache(_id, first3);
    allData = [...allData, ...data];
    numPeticiones += requests;
  }

  // const dataPromiseClipsByUser = userId.map(async (id) => {
  //   return await getClipsByUserCache(id);
  // });

  // const data = await Promise.all(dataPromiseClipsByUser);
  //TIEMPO
  const totalPeticiones = requests2 + numPeticiones;

  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  console.log(`Datos Nivel 3 Cache REST: ${allData.length}.`.underline);

  return { data: allData, time3: tiempo, requests3: totalPeticiones };
};

const getCasoPrueba4RestCache = async () => {
  const t1 = performance.now();

  const clipsByUser = (await getCasoPrueba3RestCache()).data;

  const broadcasterId = [];

  clipsByUser.forEach((clips) => {
    clips.forEach((dataClips) => {
      broadcasterId.push(dataClips.broadcaster_id);
    });
  });

  const dataPromiseInformationChannel = broadcasterId.map(async (id) => {
    return await getChannelInformationCache(id);
  });

  const data = await Promise.all(dataPromiseInformationChannel);
  //TIEMPO
  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);

  return { data: data, time: segundos };
};

const getCasoPrueba5RestCache = async () => {
  const t1 = performance.now();

  const channelInformation = (await getCasoPrueba4RestCache()).data;

  const gameId = [];

  channelInformation.forEach((channel) => {
    channel.forEach((dataChannel) => {
      gameId.push(dataChannel.game_id);
    });
  });

  const dataPromiseInformationGame = gameId.map(async (id) => {
    return await getGameInformationCache(id);
  });

  const data = await Promise.all(dataPromiseInformationGame);
  //TIEMPO
  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);

  return { data: data, time: segundos };
};

module.exports = {
  getCasoPrueba1RestCache,
  getCasoPrueba2RestCache,
  getCasoPrueba3RestCache,
  getCasoPrueba4RestCache,
  getCasoPrueba5RestCache,
};
