import pkg from "./ApiRest.cjs";

const {
  getLiveStreams,
  getVideosByGame,
  getInformationChannel,
  getClipsByUser,
  getInformationGame,
} = pkg;
import { performance } from "perf_hooks";

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
export const casoPrueba1 = async (first) => {
  let t1 = performance.now();
  console.log("INICIO CASO DE PRUEBA 1".red);
  const { data, requests } = await getLiveStreams(first);
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  const numPeticiones = requests;

  return {
    data: data,
    time: tiempo,
    requests: numPeticiones,
  };
};

//CASO DE PRUEBA 2: VIDEOS BY GAME
export const casoPrueba2 = async (first, first2) => {
  try {
    let dataForCaso2 = [];
    let numPeticiones = 0;
    let datCaso1, requestsCaso1;
    let idCount = 0;
    let t1 = performance.now();

    const caso1 = await casoPrueba1(first);
    datCaso1 = caso1.data;
    requestsCaso1 = caso1.requests;
    const idGame = datCaso1.map((resp) => resp.game_id);

    console.log("INICIO CASO DE PRUEBA 2".red);
    for (const iDs of idGame) {
      if (iDs.trim() === "") {
        console.log("ID vacío encontrado. Saltando consulta de videos...");
        continue;
      }
      const { data, requests } = await getVideosByGame(iDs, first2);
      if (data.length >= first2) {
        idCount++;
      }
      numPeticiones += requests;
      dataForCaso2.push(...data);
      if (idCount >= first) {
        break;
      }
    }
    console.log(`Cantidad de juegos con mas de ${first2} videos: ${idCount}`);

    const eficiencia = ((idCount * 100) / first2).toFixed(2);
    console.log("LA EFICIENCIA ES: ", eficiencia, "%");

    const totalPeticiones = requestsCaso1 + numPeticiones;
    let t2 = performance.now();
    const tiempo = getTime(t1, t2);

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
export const casoPrueba3 = async (first, first2, first3) => {
  let dataForCaso3 = [];
  let numPeticiones = 0;
  let dataCaso2, requestCaso2;
  let idCount = 0;

  let t1 = performance.now();

  const result = await casoPrueba2(first, first2);
  dataCaso2 = result.data2;
  requestCaso2 = result.requests2;
  const idUserVideos = dataCaso2.map((resp) => resp.user_id);

  console.log("INICIO CASO DE PRUEBA 3".red);
  for (const iDs of idUserVideos) {
    const { data, requests } = await getClipsByUser(iDs, first3);
    if (data.length >= first3) {
      idCount++;
    }
    dataForCaso3.push(...data);
    numPeticiones += requests;

    if (idCount >= dataCaso2.length) {
      break;
    }
  }
  console.log(`Cantidad de usuarios con mas de ${first3} clips: ${idCount}.`);

  const eficiencia = ((idCount * 100) / dataCaso2.length).toFixed(2);
  console.log("LA EFICIENCIA ES: ", eficiencia, "%");

  const totalPeticiones = requestCaso2 + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  return {
    data3: dataForCaso3,
    time3: tiempo,
    requests3: totalPeticiones,
  };
};

//CASO DE PRUEBA 4: INFORMATION CHANNEL
export const casoPrueba4 = async (first, first2, first3) => {
  let t1 = performance.now();
  let numPeticiones = 0;
  let allData = [];
  let idCount = 0;

  const { data3, requests3 } = await casoPrueba3(first, first2, first3);
  const broadcaster_id = [];
  data3.forEach((id) => {
    broadcaster_id.push(id.broadcaster_id);
  });

  console.log("INICIO CASO DE PRUEBA 4".red);
  for (const _id of broadcaster_id) {
    const { data, requests } = await getInformationChannel(_id);
    allData = [...allData, ...data];
    numPeticiones += requests;
    idCount++;
  }
  console.log(
    `Cantidad informacion de canal de un usuario con mas de ${data3.length} datos: ${idCount}.`
  );

  const eficiencia = ((idCount * 100) / data3.length).toFixed(2);
  console.log("LA EFICIENCIA ES: ", eficiencia, "%");

  const totalPeticiones = requests3 + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  return {
    data4: allData,
    time4: tiempo,
    requests4: totalPeticiones,
  };
};

//CASO DE PRUEBA 5: INFORMATION GAME
export const casoPrueba5 = async (first, first2, first3) => {
  let t1 = performance.now();
  let numPeticiones = 0;
  let allData = [];
  let idCount = 0;
  const { data4, requests4 } = await casoPrueba4(first, first2, first3);
  const dataInformationChannel = data4;

  const dataGame = [];

  dataInformationChannel.forEach((id) => {
    dataGame.push(id.game_id);
  });

  console.log("INICIO CASO DE PRUEBA 5".red);
  for (const _id of dataGame) {
    const { data, requests } = await getInformationGame(_id);
    allData = [...allData, ...data];
    numPeticiones += requests;
    idCount++;
  }
  console.log(
    `Cantidad de informacion de un juego con mas de ${data4.length} datos: ${idCount}.`
  );
  const eficiencia = ((idCount * 100) / data4.length).toFixed(2);
  console.log("LA EFICIENCIA ES: ", eficiencia, "%");
  const totalPeticiones = requests4 + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  return {
    data5: allData,
    time5: tiempo,
    requests5: totalPeticiones,
  };
};
