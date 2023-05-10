import {
  getLiveStreams,
  getVideosByGame,
  getInformationChannel,
  getClipsByUser,
  getInformationGame,
} from "./ApiRest.js";
import { performance } from "perf_hooks";

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
  const data = (await getLiveStreams(first)).data;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  const numPeticiones = (await getLiveStreams(first)).requests;
  console.log(`Datos del nivel 1: ${data.length}.`.underline);

  return { data: data, time: tiempo, requests: numPeticiones };
};

//CASO DE PRUEBA 2: VIDEOS BY GAME
export const casoPrueba2 = async (first, first2) => {
  let t1 = performance.now();
  const dataLiveStreams = (await casoPrueba1(first)).data;
  const idGame = dataLiveStreams.map((resp) => resp.game_id);
  let numPeticiones;

  const dataVideosByGame = idGame.map(async (game_id) => {
    numPeticiones = (await getVideosByGame(game_id, first2)).requests;

    return (await getVideosByGame(game_id, first2)).data;
  });

  //Promise all sirve para sacar los datos almacenados
  const allDataVideosByGame = await Promise.all(dataVideosByGame);

  var objetos = [];

  for (var i = 0; i < allDataVideosByGame.length; i++) {
    for (var j = 0; j < allDataVideosByGame[i].length; j++) {
      objetos.push(allDataVideosByGame[i][j]);
    }
  }
  const totalPeticiones = (await casoPrueba1(first)).requests + numPeticiones;

  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  console.log(`Datos del nivel 2: ${objetos.length}.`.underline);

  return { data: objetos, time: tiempo, requests: totalPeticiones };
};

//CASO DE PRUEBA 3: CLIPS BY USER
export const casoPrueba3 = async (first, first2, first3) => {
  let t1 = performance.now();

  const dataVideosByGame = (await casoPrueba2(first, first2)).data;
  const idUserVideos = dataVideosByGame.map((resp) => resp.user_id);
  let numPeticiones;
  const dataClipsByUser = idUserVideos.map(async (_id) => {
    numPeticiones = (await getClipsByUser(_id, first3)).requests;

    return (await getClipsByUser(_id, first3)).data;
  });

  const allDataClipsByUser = await Promise.all(dataClipsByUser);

  var allData = [].concat.apply(
    [],
    allDataClipsByUser.map((arr) => {
      return arr;
    })
  );

  const totalPeticiones =
    (await casoPrueba2(first, first2)).requests + numPeticiones;

  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  console.log(`Datos del nivel 3: ${allData.length}.`.underline);

  return { data: allData, time: tiempo, requests: totalPeticiones };
};

//CASO DE PRUEBA 4: INFORMATION CHANNEL
export const casoPrueba4 = async (first, first2, first3, first4) => {
  let t1 = performance.now();
  let numPeticiones;
  const dataClipsByUser = (await casoPrueba3(first, first2, first3)).data;

  const broadcaster_id = [];
  dataClipsByUser.forEach((id) => {
    broadcaster_id.push(id.broadcaster_id);
  });

  const dataInformationChannel = broadcaster_id.map(async (_id) => {
    numPeticiones = (await getInformationChannel(_id, first4)).requests;

    return (await getInformationChannel(_id, first4)).data;
  });

  const allDataInformationChannel = await Promise.all(dataInformationChannel);

  var allData = [].concat.apply(
    [],
    allDataInformationChannel.map((arr) => {
      return arr;
    })
  );

  const totalPeticiones =
    (await casoPrueba3(first, first2, first3)).requests + numPeticiones;

  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  console.log(`Datos del nivel 4: ${allData.length}.`.underline);

  return { data: allData, time: tiempo, requests: totalPeticiones };
};

//CASO DE PRUEBA 5: INFORMATION GAME
export const casoPrueba5 = async (first, first2, first3, first4, first5) => {
  let t1 = performance.now();
  let numPeticiones;
  const dataInformationChannel = (
    await casoPrueba4(first, first2, first3, first4)
  ).data;

  const dataGame = [];
  dataInformationChannel.forEach((id) => {
    dataGame.push(id.game_id);
  });

  const dataInformationGame = dataGame.map(async (_id) => {
    numPeticiones = (await getInformationGame(_id, first5)).requests;
    return (await getInformationGame(_id, first5)).data;
  });

  const allData = await Promise.all(dataInformationGame);

  var allDataInformationGame = [].concat.apply(
    [],
    allData.map((arr) => {
      return arr;
    })
  );

  const totalPeticiones =
    (await casoPrueba4(first, first2, first3, first4)).requests + numPeticiones;

  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  console.log(`Datos del nivel 4: ${allDataInformationGame.length}.`.underline);

  return {
    data: allDataInformationGame,
    time: tiempo,
    requests: totalPeticiones,
  };
};
