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
  const { data, request } = await getLiveStreams(first);
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  const numPeticiones = request;
  console.log(`Datos del nivel 1: ${data.length}.`.underline);

  return { data: data, time: tiempo, requests: numPeticiones };
};

//CASO DE PRUEBA 2: VIDEOS BY GAME
export const casoPrueba2 = async (first, first2) => {
  let t1 = performance.now();
  let numPeticiones = 0;
  let objetos = [];
  const { data, requests } = await casoPrueba1(first);
  const dataLiveStreams = data;
  const idGame = dataLiveStreams.map((resp) => resp.game_id);

  for (const game_id of idGame) {
    const { data, requests } = await getVideosByGame(game_id, first2);
    numPeticiones += requests;
    objetos = [...objetos, ...data];
  }

  const totalPeticiones = requests + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  console.log(`Datos del nivel 2: ${objetos.length}.`.underline);

  return { data: objetos, time2: tiempo, requests2: totalPeticiones };
};

//CASO DE PRUEBA 3: CLIPS BY USER
export const casoPrueba3 = async (first, first2, first3) => {
  let t1 = performance.now();
  let allData = [];
  let numPeticiones = 0;
  const { data, requests2 } = await casoPrueba2(first, first2);
  const dataVideosByGame = data;
  const idUserVideos = dataVideosByGame.map((resp) => resp.user_id);

  for (const _id of idUserVideos) {
    const { data, requests } = await getClipsByUser(_id, first3);
    allData = [...allData, ...data];
    numPeticiones += requests;
  }

  const totalPeticiones = requests2 + numPeticiones;

  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  console.log(`Datos del nivel 3: ${allData.length}.`.underline);

  return { data: allData, time3: tiempo, requests3: totalPeticiones };
};

//CASO DE PRUEBA 4: INFORMATION CHANNEL
export const casoPrueba4 = async (first, first2, first3, first4) => {
  let t1 = performance.now();
  let numPeticiones = 0;
  let allData = [];
  const { data, requests3 } = await casoPrueba3(first, first2, first3);
  const dataClipsByUser = data;

  const broadcaster_id = [];
  dataClipsByUser.forEach((id) => {
    broadcaster_id.push(id.broadcaster_id);
  });

  for (const _id of broadcaster_id) {
    const { data, requests } = await getInformationChannel(_id, first4);
    allData = [...allData, ...data];
    numPeticiones += requests;
  }

  // const dataInformationChannel = broadcaster_id.map(async (_id) => {
  //   return (await getInformationChannel(_id, first4)).data;
  // });

  // const allDataInformationChannel = await Promise.all(dataInformationChannel);

  // var allData = [].concat.apply(
  //   [],
  //   allDataInformationChannel.map((arr) => {
  //     return arr;
  //   })
  // );

  const totalPeticiones = requests3 + numPeticiones;

  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  console.log(`Datos del nivel 4: ${allData.length}.`.underline);

  return { data: allData, time4: tiempo, requests4: totalPeticiones };
};

//CASO DE PRUEBA 5: INFORMATION GAME
export const casoPrueba5 = async (first, first2, first3, first4, first5) => {
  let t1 = performance.now();
  let numPeticiones = 0;
  let allData = [];
  const { data, requests4 } = await casoPrueba4(first, first2, first3, first4);
  const dataInformationChannel = data;

  const dataGame = [];

  dataInformationChannel.forEach((id) => {
    dataGame.push(id.game_id);
  });

  for (const _id of dataGame) {
    const { data, requests } = await getInformationGame(_id, first5);
    allData = [...allData, ...data];
    numPeticiones += requests;
  }

  // const dataInformationGame = dataGame.map(async (_id) => {
  //   numPeticiones = (await getInformationGame(_id, first5)).requests;
  //   return (await getInformationGame(_id, first5)).data;
  // });

  // const allData = await Promise.all(dataInformationGame);

  // var allDataInformationGame = [].concat.apply(
  //   [],
  //   allData.map((arr) => {
  //     return arr;
  //   })
  // );

  const totalPeticiones = requests4 + numPeticiones;

  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  console.log(`Datos del nivel 4: ${allDataInformationGame.length}.`.underline);

  return {
    data: allData,
    time5: tiempo,
    requests5: totalPeticiones,
  };
};
