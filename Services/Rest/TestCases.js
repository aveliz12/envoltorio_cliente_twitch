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
  console.log("<=================NIVEL 1=================>");
  console.log(data.length, " datos");
  console.log("La consulta tardó: ", segundos, "segundos");
  return data;
};

//CASO DE PRUEBA 2: VIDEOS BY GAME
export const casoPrueba2 = async (first) => {
  let t1 = performance.now();
  const dataLiveStreams = await casoPrueba1(first);
  const idGame = dataLiveStreams.map((resp) => resp.game_id);

  const dataVideosByGame = idGame.map(async (game_id) => {
    return await getVideosByGame(game_id);
  });

  let t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);

  //Promise all sirve para sacar los datos almacenados
  const allDataVideosByGame = await Promise.all(dataVideosByGame);

  var objetos = [];

  for (var i = 0; i < allDataVideosByGame.length; i++) {
    for (var j = 0; j < allDataVideosByGame[i].length; j++) {
      objetos.push(allDataVideosByGame[i][j]);
    }
  }

  console.log("<=================NIVEL 2=================>");
  console.log(objetos.length, " datos");
  console.log("La consulta tardó: ", segundos, "segundos");

  return objetos;
};

//CASO DE PRUEBA 3: CLIPS BY USER
export const casoPrueba3 = async (first) => {
  let t1 = performance.now();

  const dataVideosByGame = await casoPrueba2(first);
  const idUserVideos = dataVideosByGame.map((resp) => resp.user_id);

  const dataClipsByUser = idUserVideos.map(async (_id) => {
    return await getClipsByUser(_id);
  });

  const allDataClipsByUser = await Promise.all(dataClipsByUser);

  var allData = [].concat.apply(
    [],
    allDataClipsByUser.map((arr) => {
      return arr;
    })
  );

  let t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);

  console.log("<=================NIVEL 3=================>");
  console.log(allData.length, " datos");
  console.log("La consulta tardó: ", segundos, "segundos");

  return allData;
};

//CASO DE PRUEBA 4: INFORMATION CHANNEL
export const casoPrueba4 = async (first) => {
  let t1 = performance.now();

  const dataClipsByUser = await casoPrueba3(first);

  const broadcaster_id = [];
  dataClipsByUser.forEach((id) => {
    broadcaster_id.push(id.broadcaster_id);
  });

  const dataInformationChannel = broadcaster_id.map(async (_id) => {
    return await getInformationChannel(_id);
  });

  const allDataInformationChannel = await Promise.all(dataInformationChannel);

  var allData = [].concat.apply(
    [],
    allDataInformationChannel.map((arr) => {
      return arr;
    })
  );

  let t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);

  console.log("<=================NIVEL 4=================>");
  console.log(allData.length, " datos");
  console.log("La consulta tardó: ", segundos, "segundos");

  return allData;
};

//CASO DE PRUEBA 5: INFORMATION GAME
export const casoPrueba5 = async (first) => {
  let t1 = performance.now();

  const dataInformationChannel = await casoPrueba4(first);

  const dataGame = [];
  dataInformationChannel.forEach((id) => {
    dataGame.push(id.game_id);
  });

  const dataInformationGame = dataGame.map(async (_id) => {
    return await getInformationGame(_id);
  });

  const allData = await Promise.all(dataInformationGame);

  var allDataInformationGame = [].concat.apply(
    [],
    allData.map((arr) => {
      return arr;
    })
  );

  let t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);

  console.log("<=================NIVEL 5=================>");
  console.log(allDataInformationGame.length, " datos");
  console.log("La consulta tardó: ", segundos, "segundos");

  return allDataInformationGame;
};
