import {
  getLiveStreams,
  getVideosByGame,
  getInformationChannel,
  getClipsByUser,
  getInformationGame,
} from "./ApiRest.js";
import { performance } from "perf_hooks";

//CASO DE PRUEBA 1: LIVE STREAMS
export const casoPrueba1 = async (first) => {
  let t1 = performance.now();
  const data = await getLiveStreams(first);
  let t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log("NIVEL 1");
  console.log(data.length);
  console.log("La consulta tardó: ", segundos, "segundos");
  return data;
};

//CASO DE PRUEBA 2: VIDEOS BY GAME
export const casoPrueba2 = async () => {
  let t1 = performance.now();
  const dataLiveStreams = await casoPrueba1();
  const idGame = dataLiveStreams.map((resp) => resp.game_id);
  const dataVideosByGame = idGame.map(async (game_id) => {
    return await getVideosByGame(game_id);
  });
  let t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);

  //Promise all sirve para sacar los datos almacenados
  const allDataVideosByGame = await Promise.all(dataVideosByGame);
  console.log("NIVEL 2");
  console.log(allDataVideosByGame.length);
  console.log("La consulta tardó: ", segundos, "segundos");

  return allDataVideosByGame;
};

//CASO DE PRUEBA 3: CLIPS BY USER
export const casoPrueba3 = async () => {
  let t1 = performance.now();

  const dataChannelInformation = await casoPrueba2();

  const user_id = [];

  dataChannelInformation.forEach((id) => {
    const data = [].concat(id.data);
    data.map((resp) => user_id.push(resp?.user_id));
  });

  const dataClipsByUser = user_id.map(async (_id) => {
    return await getClipsByUser(_id);
  });

  let t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  const allDataClipsByUser = await Promise.all(dataClipsByUser);
  console.log("NIVEL 4");

  console.log(allDataClipsByUser.length);
  console.log("La consulta tardó: ", segundos, "segundos");

  return allDataClipsByUser;
};

//CASO DE PRUEBA 4: INFORMATION CHANNEL
export const casoPrueba4 = async () => {
  let t1 = performance.now();

  const dataVideosByGame = await casoPrueba3();

  const broadcaster_id = [];
  dataVideosByGame.forEach((id) => {
    id.map((resp) => broadcaster_id.push(resp.broadcaster_id));
  });

  const dataInformationChannel = broadcaster_id.map(async (_id) => {
    return await getInformationChannel(_id);
  });
  let t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);

  const allDataInformationChannel = await Promise.all(dataInformationChannel);
  console.log("NIVEL 3");
  console.log(allDataInformationChannel.length);
  console.log("La consulta tardó: ", segundos, "segundos");

  return allDataInformationChannel;
};

//CASO DE PRUEBA 5: INFORMATION GAME
export const casoPrueba5 = async () => {
  let t1 = performance.now();

  const dataClipsByUser = await casoPrueba4();

  const dataGame = [];

  dataClipsByUser.forEach((id) => {
    const data = [].concat(id.data);
    data.map((resp) => dataGame.push(resp?.game_id));
  });

  const dataInformationGame = dataGame.map(async (_id) => {
    return await getInformationGame(_id);
  });
  let t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  const allData = await Promise.all(dataInformationGame);
  console.log("NIVEL 5");
  console.log(allData.length);
  console.log("La consulta tardó: ", segundos, "segundos");

  return allData;
};
