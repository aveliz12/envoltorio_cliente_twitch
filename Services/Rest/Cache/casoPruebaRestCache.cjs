const {
  getLiveStreamsCache,
  getVideosByGameCache,
  getClipsByUserCache,
  getChannelInformationCache,
  getGameInformationCache,
} = require("./restCacheApollo.cjs");
const { performance }= require("perf_hooks");

const getCasoPrueba1RestCache = async () => {
  const t1 = performance.now();
  const data = await getLiveStreamsCache();
  const t2 = performance.now();
  let milisegundos = (t2 - t1).toFixed(2);
  console.log("NIVEL 1 CACHE");
  console.log(`La consulta desde cache en REST tardó: ${milisegundos} ms`);
  return data;
};

const getCasoPrueba2RestCache = async () => {
  const t1 = performance.now();

  const { liveS: dataLiveStreams } = await getCasoPrueba1RestCache();
  const gameId = dataLiveStreams.map((resp) => resp.game_id);

  const dataPromiseVideosByGame = gameId.map(async (id) => {
    return await getVideosByGameCache(id);
  });

  const data = await Promise.all(dataPromiseVideosByGame);
  //TIEMPO
  const t2 = performance.now();
  let milisegundos = (t2 - t1).toFixed(2);
  console.log("NIVEL 2 CACHE");
  console.log(`La consulta desde cache en REST tardó: ${milisegundos} ms`);
  return {
    data,
    time: milisegundos,
  };
};

const getCasoPrueba3RestCache = async () => {
  const t1 = performance.now();

  const { videoG: datavideosGame } = await getCasoPrueba2RestCache();
  const gameId = dataLiveStreams.map((resp) => resp.game_id);

  const userId = [];

  datavideosGame.forEach((videos) => {
    videos.forEach((dataVideo) => {
      userId.push(dataVideo.user_id);
    });
  });

  const dataPromiseClipsByUser = userId.map(async (id) => {
    return await getClipsByUserCache(id);
  });

  const data = await Promise.all(dataPromiseClipsByUser);
  //TIEMPO
  const t2 = performance.now();
  let milisegundos = (t2 - t1).toFixed(2);
  console.log("NIVEL 2 CACHE");
  console.log(`La consulta desde cache en REST tardó: ${milisegundos} ms`);
  return {
    data,
    time: milisegundos,
  };
};

module.exports = {
  getCasoPrueba1RestCache,
  getCasoPrueba2RestCache,
  getCasoPrueba3RestCache,
};
