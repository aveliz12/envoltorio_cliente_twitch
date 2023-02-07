import {
  getLiveStreams,
  getVideosByGame,
  getInformationChannel,
  getClipsByUser,
  getInformationGame,
} from "./ApiRest.js";
import { performance } from "perf_hooks";

export const casoPrueba1 = async () => {
  let t1 = performance.now();
  const data = await getLiveStreams();
  let t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log("NIVEL 1");
  console.log(data.length);
  console.log("La consulta tardó: ", segundos, "segundos");
  return data;
};

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

export const casoPrueba3 = async () => {
  let t1 = performance.now();

  const dataVideosByGame = await casoPrueba2();

  const idUser = [];
  dataVideosByGame.forEach((id) => {
    id.map((resp) => idUser.push(resp.user_id));
  });

  const dataInformationChannel = idUser.map(async (_id) => {
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

export const casoPrueba4 = async () => {
  let t1 = performance.now();

  const dataChannelInformation = await casoPrueba3();

  const broadcasterId = [];

  dataChannelInformation.forEach((id) => {
    const data = [].concat(id.data);
    data.map((resp) => broadcasterId.push(resp?.broadcaster_id));
  });

  const dataClipsByUser = broadcasterId.map(async (_id) => {
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
