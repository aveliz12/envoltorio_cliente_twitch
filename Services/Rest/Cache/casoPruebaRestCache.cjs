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
const { saveFileCasoPrueba } = require("../../helpers/globalHelpers.cjs");

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
const getCasoPrueba1RestCache = async (first, save) => {
  const t1 = performance.now();
  const { data, requests } = await getLiveStreamsCache(first);
  const t2 = performance.now();
  const tiempo = getTime(t1, t2);

  const numPeticiones = requests;

  if (save) {
    saveFileCasoPrueba(
      `Caso_1_Rest_Caché_Limit_${first}`,
      data,
      "Data REST Caché"
    );
  }
  return { data: data, time: tiempo, requests1: numPeticiones };
};

//CASO DE PRUEBA 2 CACHE: VIDEOS BY GAME
const getCasoPrueba2RestCache = async (first, first2, save) => {
  let numPeticiones = 0,
    totalDataVideos = 0;
  const t1 = performance.now();
  const { data: datCaso1, requests1: requestsCaso1 } =
    await getCasoPrueba1RestCache(first);

  const dataPromise = datCaso1.map(async (liveStream) => {
    if (liveStream.game_id.trim() === "") {
      console.log("ID vacío encontrado. Saltando consulta de videos...");
      return null;
    }
    const { data, requests } = await getVideosByGameCache(
      liveStream.game_id,
      first2
    );
    numPeticiones += requests;
    if (data.length >= first2) {
      totalDataVideos++;
    }

    return { ...liveStream, videosByGame: data };
  });

  const objetos = await Promise.all(dataPromise);

  //TIEMPO
  let t2 = performance.now();
  const totalPeticiones = requestsCaso1 + numPeticiones;
  const tiempo = getTime(t1, t2);

  if (save) {
    saveFileCasoPrueba(
      `Caso_2_Rest_Caché_Limit_${first}_${first2}`,
      objetos,
      "Data REST Caché"
    );
  }

  return { data2: objetos, time2: tiempo, requests2: totalPeticiones };
};

const getCasoPrueba3RestCache = async (first, first2, first3, save) => {
  const t1 = performance.now();
  let totalDataClips = 0,
    numPeticiones = 0;

  const { data2: dataCaso2, requests2: requestCaso2 } =
    await getCasoPrueba2RestCache(first, first2);

  const dataPromiseCaso3 = dataCaso2.map(async (videos) => {
    const dataVideosAndLiveStreams = videos.videosByGame.map(async (clips) => {
      const { data, requests } = await getClipsByUserCache(
        clips.user_id,
        first3
      );
      numPeticiones += requests;
      if (data.length >= first3) {
        totalDataClips++;
      }
      return {
        ...clips,
        clipsByUser: data,
      };
    });
    const responseDataVideosAndStreams = await Promise.all(
      dataVideosAndLiveStreams
    );
    return { ...videos, videosByGame: responseDataVideosAndStreams };
  });

  const allData = await Promise.all(dataPromiseCaso3);

  //TIEMPO
  let t2 = performance.now();
  const totalPeticiones = requestCaso2 + numPeticiones;

  const tiempo = getTime(t1, t2);
  if (save) {
    saveFileCasoPrueba(
      `Caso_3_Rest_Caché_Limit_${first}_${first2}_${first3}`,
      allData,
      "Data REST Caché"
    );
  }
  return { data3: allData, time3: tiempo, requests3: totalPeticiones };
};

const getCasoPrueba4RestCache = async (first, first2, first3, save) => {
  const t1 = performance.now();
  let numPeticiones = 0;
  const { data3, requests3 } = await getCasoPrueba3RestCache(
    first,
    first2,
    first3
  );
  const dataPromiseChannel = data3.map(async (videos) => {
    const dataVideosWithStreams = videos.videosByGame.map(async (clips) => {
      const dataClipsWithVideos = clips.clipsByUser.map(async (channel) => {
        const { data, requests } = await getChannelInformationCache(
          channel.broadcaster_id
        );
        numPeticiones += requests;

        return {
          ...channel,
          channelInformation: data,
        };
      });

      const allDataChannel = await Promise.all(dataClipsWithVideos);
      return {
        ...clips,
        clipsByUser: allDataChannel,
      };
    });

    const allDataVideosStreams = await Promise.all(dataVideosWithStreams);
    return {
      ...videos,
      videosByGame: allDataVideosStreams,
    };
  });

  const allData = await Promise.all(dataPromiseChannel);

  //TIEMPO
  const totalPeticiones = requests3 + numPeticiones;

  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  if (save) {
    saveFileCasoPrueba(
      `Caso_4_Rest_Caché_Limit_${first}_${first2}_${first3}_1`,
      allData,
      "Data REST Caché"
    );
  }

  return { data4: allData, time4: tiempo, requests4: totalPeticiones };
};

const getCasoPrueba5RestCache = async (first, first2, first3, save) => {
  const t1 = performance.now();
  let numPeticiones = 0;
  const { data4, requests4 } = await getCasoPrueba4RestCache(
    first,
    first2,
    first3
  );

  const dataPromiseGame = data4.map(async (videos) => {
    const dataVideosWithStreams = videos.videosByGame.map(async (clips) => {
      const dataClipsWithVideos = clips.clipsByUser.map(async (channel) => {
        const dataChanelInfo = channel.channelInformation.map(async (game) => {
          const { dataGames, requestsGames } = await getGameInformationCache(
            game.game_id
          );
          numPeticiones += requestsGames;
          return {
            ...game,
            gameInformation: dataGames,
          };
        });
        const allDataGame = await Promise.all(dataChanelInfo);
        return {
          ...channel,
          channelInformation: allDataGame,
        };
      });

      const allDataChannel = await Promise.all(dataClipsWithVideos);
      return {
        ...clips,
        clipsByUser: allDataChannel,
      };
    });

    const allDataVideosStreams = await Promise.all(dataVideosWithStreams);
    return {
      ...videos,
      videosByGame: allDataVideosStreams,
    };
  });

  const allData = await Promise.all(dataPromiseGame);
  //TIEMPO
  const totalPeticiones = requests4 + numPeticiones;

  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  if (save) {
    saveFileCasoPrueba(
      `Caso_5_Rest_Caché_Limit_${first}_${first2}_${first3}_1_1`,
      allData,
      "Data REST Caché"
    );
  }

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
