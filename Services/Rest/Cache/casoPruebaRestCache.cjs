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
  const t1 = performance.now();
  let numPeticiones = 0,
    objetos = [],
    totalDataVideos = 0,
    requestsCaso1;
  do {
    const { data: datCaso1, requests1 } = await getCasoPrueba1RestCache(first);
    requestsCaso1 = requests1;
    let idFound = false;

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
      if (data.length >= first2 && data.length > 0) {
        objetos.push(...data);
        totalDataVideos++;
        idFound = true;
      }

      return data;
    });

    await Promise.all(dataPromise);

    if (!idFound) {
      console.log(
        "No se encontraron suficientes datos con los IDs actuales. Consultando con nuevos IDs..."
      );
    }
  } while (totalDataVideos < first);

  //TIEMPO
  const totalPeticiones = requestsCaso1 + numPeticiones;
  let t2 = performance.now();
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
  let allData = [],
    totalDataClips = 0,
    numPeticiones = 0,
    dataCaso2,
    requestCaso2;

  do {
    const result = await getCasoPrueba2RestCache(first, first2);
    dataCaso2 = result.data2;
    requestCaso2 = result.requests2;
    let idFound = false;

    // const userId = dataCaso2.map((dataVideo) => dataVideo.user_id);

    const dataPromiseCaso3 = dataCaso2.map(async (clips) => {
      const { data, requests } = await getClipsByUserCache(
        clips.user_id,
        first3
      );
      numPeticiones += requests;
      if (data.length >= first3) {
        allData.push(...data);
        totalDataClips++;
        idFound = true;
      }
    });

    await Promise.all(dataPromiseCaso3);

    if (!idFound) {
      console.log(
        "No se encontraron suficientes datos con los IDs actuales. Consultando con nuevos IDs..."
      );
    }
  } while (totalDataClips < dataCaso2.length);

  //TIEMPO
  const totalPeticiones = requestCaso2 + numPeticiones;

  let t2 = performance.now();
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
  let allData = [];
  const { data3, requests3 } = await getCasoPrueba3RestCache(
    first,
    first2,
    first3
  );

  const dataPromiseCaso4 = data3.map(async (channel) => {
    const { data, requests } = await getChannelInformationCache(
      channel.broadcaster_id
    );
    allData = [...allData, ...data];
    numPeticiones += requests;
  });

  await Promise.all(dataPromiseCaso4);

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

const getCasoPrueba5RestCache = async (first, first2, first3,save) => {
  const t1 = performance.now();
  let numPeticiones = 0;
  let allData = [];
  const { data4, requests4 } = await getCasoPrueba4RestCache(
    first,
    first2,
    first3
  );

  const dataPromiseCaso5 = data4.map(async (game) => {
    const { dataGames, requestsGames } = await getGameInformationCache(
      game.game_id
    );
    allData = [...allData, ...dataGames];
    numPeticiones += requestsGames;
  });

  await Promise.all(dataPromiseCaso5);
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
