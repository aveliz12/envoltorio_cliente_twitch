import pkg from "./ApiRest.cjs";
import helpersPkg from "../helpers/globalHelpers.cjs";
import { performance } from "perf_hooks";
const {
  getLiveStreams,
  getVideosByGame,
  getInformationChannel,
  getClipsByUser,
  getInformationGame,
} = pkg;
const { saveFileCasoPrueba } = helpersPkg;

/*____________________REST SIN CACHE______________________________*/

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

//CASO DE PRUEBA 1: LIVE STREAMS
export const casoPrueba1 = async (first, save) => {
  let t1 = performance.now();
  console.log("INICIO CASO DE PRUEBA 1".red);
  const { data, requests } = await getLiveStreams(first);
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  const numPeticiones = requests;

  if (save) {
    saveFileCasoPrueba(`Caso_1_Rest_Limit_${first}`, data, "Data REST");
  }

  return {
    data: data,
    time: tiempo,
    requests: numPeticiones,
  };
};

//CASO DE PRUEBA 2: VIDEOS BY GAME
export const casoPrueba2 = async (first, first2, save) => {
  try {
    let dataForCaso2 = [],
      numPeticiones = 0,
      idCount = 0;
    let t1 = performance.now();

    const { data: datCaso1, requests: requestsCaso1 } = await casoPrueba1(
      first
    );
    console.log("INICIO CASO DE PRUEBA 2".red);

    const dataPromise = datCaso1.map(async (liveStream) => {
      if (liveStream.game_id.trim() === "") {
        console.log("ID vacío encontrado. Saltando consulta de videos...");
        return null;
      }
      const { data, requests } = await getVideosByGame(
        liveStream.game_id,
        first2
      );
      numPeticiones += requests;
      if (data.length >= first2) {
        idCount++;
        dataForCaso2.push(...data);
      }

      return data;
    });

    await Promise.all(dataPromise);

    console.log(`Cantidad de juegos con mas de ${first2} videos: ${idCount}`);

    const eficiencia = ((idCount * 100) / first2).toFixed(2);
    console.log("LA EFICIENCIA ES: ", eficiencia, "%");

    const totalPeticiones = requestsCaso1 + numPeticiones;
    let t2 = performance.now();
    const tiempo = getTime(t1, t2);

    if (save) {
      saveFileCasoPrueba(
        `Caso_2_Rest_Limit_${first}_${first2}`,
        dataForCaso2,
        "Data REST"
      );
    }

    return {
      data2: dataForCaso2,
      time2: tiempo,
      requests2: totalPeticiones,
    };
  } catch (error) {
    console.log(error);
  }
};

//CASO DE PRUEBA 3: CLIPS BY USER
export const casoPrueba3 = async (first, first2, first3, save) => {
  let dataForCaso3 = [],
    numPeticiones = 0,
    idCount = 0;
  let t1 = performance.now();

  const { data2: dataCaso2, requests2: requestCaso2 } = await casoPrueba2(
    first,
    first2
  );
  console.log("INICIO CASO DE PRUEBA 3".red);

  const dataPromiseClipsByUser = dataCaso2.map(async (clips) => {
    const { data, requests } = await getClipsByUser(clips.user_id, first3);
    numPeticiones += requests;
    if (data.length >= first3) {
      idCount++;
      dataForCaso3.push(...data);
    }
  });

  await Promise.all(dataPromiseClipsByUser);

  console.log(
    `Cantidad de usuarios con mas de ${first3} clips: ${idCount}. De un total de ${dataCaso2.length} datos.`
  );

  const eficiencia = ((idCount * 100) / dataCaso2.length).toFixed(2);
  console.log("LA EFICIENCIA ES: ", eficiencia, "%");

  const totalPeticiones = requestCaso2 + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  if (save) {
    saveFileCasoPrueba(
      `Caso_3_Rest_Limit_${first}_${first2}_${first3}`,
      dataForCaso3,
      "Data REST"
    );
  }
  return {
    data3: dataForCaso3,
    time3: tiempo,
    requests3: totalPeticiones,
  };
};

//CASO DE PRUEBA 4: INFORMATION CHANNEL
export const casoPrueba4 = async (first, first2, first3, save) => {
  let t1 = performance.now();
  let numPeticiones = 0,
    allData = [],
    idCount = 0;

  const { data3, requests3 } = await casoPrueba3(first, first2, first3);

  console.log("INICIO CASO DE PRUEBA 4".red);
  const dataPromiseChannel = data3.map(async (channel) => {
    const { data, requests } = await getInformationChannel(
      channel.broadcaster_id
    );
    allData = [...allData, ...data];
    numPeticiones += requests;
    idCount++;
  });

  await Promise.all(dataPromiseChannel);

  console.log(
    `Cantidad informacion de canal de un usuario con mas de ${data3.length} datos: ${idCount}.`
  );

  const eficiencia = ((idCount * 100) / data3.length).toFixed(2);
  console.log("LA EFICIENCIA ES: ", eficiencia, "%");

  const totalPeticiones = requests3 + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  if (save) {
    saveFileCasoPrueba(
      `Caso_4_Rest_Limit_${allData.length}`,
      allData,
      "Data REST"
    );
  }
  return {
    data4: allData,
    time4: tiempo,
    requests4: totalPeticiones,
  };
};

//CASO DE PRUEBA 5: INFORMATION GAME
export const casoPrueba5 = async (first, first2, first3, save) => {
  let t1 = performance.now();
  let numPeticiones = 0,
    allData = [],
    idCount = 0;
  const { data4, requests4 } = await casoPrueba4(first, first2, first3);

  console.log("INICIO CASO DE PRUEBA 5".red);

  const dataPromise = data4.map(async (game) => {
    const { data, requests } = await getInformationGame(game.game_id);
    allData = [...allData, ...data];
    numPeticiones += requests;
    idCount++;
  });

  await Promise.all(dataPromise);

  console.log(
    `Cantidad de informacion de un juego con mas de ${data4.length} datos: ${idCount}.`
  );
  const eficiencia = ((idCount * 100) / data4.length).toFixed(2);
  console.log("LA EFICIENCIA ES: ", eficiencia, "%");
  const totalPeticiones = requests4 + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  if (save) {
    saveFileCasoPrueba(
      `Caso_5_Rest_Limit_${allData.length}`,
      allData,
      "Data REST"
    );
  }
  return {
    data5: allData,
    time5: tiempo,
    requests5: totalPeticiones,
  };
};
