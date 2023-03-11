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

const getCasoPrueba1RestCache = async () => {
  const t1 = performance.now();
  const data = await getLiveStreamsCache();
  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);

  return { data: data, time: segundos };
};

const getCasoPrueba2RestCache = async () => {
  const t1 = performance.now();

  const dataLiveStreams = (await getCasoPrueba1RestCache()).data;
  const gameId = dataLiveStreams.map((resp) => resp.game_id);

  const dataPromiseVideosByGame = gameId.map(async (id) => {
    return await getVideosByGameCache(id);
  });

  const data = await Promise.all(dataPromiseVideosByGame);
  //TIEMPO
  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);

  return { data: data, time: segundos };
};

const getCasoPrueba3RestCache = async () => {
  const t1 = performance.now();

  const datavideosGame = (await getCasoPrueba2RestCache()).data;

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
  let segundos = ((t2 - t1) / 1000).toFixed(2);

  return { data: data, time: segundos };
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
