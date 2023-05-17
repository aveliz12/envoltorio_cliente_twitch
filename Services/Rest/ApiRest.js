import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();
import Storage from "node-storage";
const store = new Storage("./store");

//Variables
const url = "https://api.twitch.tv/helix/";
const params = new URLSearchParams();
params.append("client_id", process.env.CLIENTID);
params.append("client_secret", process.env.CLIENTSECRET);
params.append("grant_type", process.env.GRANTTYPE);

//Solicitar Token
//Funcion Obtener token
export const getToken = async () => {
  const urlToken = "https://id.twitch.tv/oauth2/token";

  const response = await fetch(urlToken, {
    method: "POST",
    body: params,
  });

  const data = await response.json();
  store.put("token", data.access_token);
  console.log(data);
  return data;
};

//Funcion obtener LiveStreams
export const getLiveStreams = async (first) => {
  try {
    let cursor = null;
    let dataStreams = [];
    const token = store.get("token");
    let numPeticiones = 0;

    //CONSULTA
    while (first > 0) {
      const response = await fetch(
        `${url}streams?first=${first > 50 ? 50 : first}${
          cursor === null ? "" : `&after=${cursor}`
        }`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Client-Id": process.env.CLIENTID,
          },
        }
      );
      numPeticiones++;
      const dataLiveStreams = await response.json();

      first = first - dataLiveStreams.data.length;
      dataStreams = [...dataStreams, ...dataLiveStreams.data];
      cursor = dataLiveStreams.pagination.cursor;
    }

    //console.log(`Datos del nivel 1: ${dataStreams.length}.`.underline);
    return { data: dataStreams, requests: numPeticiones };
  } catch (error) {
    console.log(error);
  }
};

//Funcion para extraer VideosByGame
export const getVideosByGame = async (id, first) => {
  try {
    let cursor = null;
    let dataVideos = [];
    const token = store.get("token");
    let numPeticiones = 0;

    while (first > 0) {
      const response = await fetch(
        `${url}videos?game_id=${id}&first=${first > 50 ? 50 : first}${
          cursor === null ? "" : `&after=${cursor}`
        }`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Client-Id": process.env.CLIENTID,
            "accept-language": "",
          },
        }
      );
      numPeticiones++;
      const dataVideosByGame = await response.json();

      first = first - dataVideosByGame.data.length;
      dataVideos = [...dataVideos, ...dataVideosByGame.data];
      cursor = dataVideosByGame.pagination.cursor;
    }

    return { data: dataVideos, requests: numPeticiones };
  } catch (error) {
    console.log(error);
  }
};

//Funcion para extraer clips por usuario
export const getClipsByUser = async (id, first) => {
  try {
    let cursor = null;
    let dataClips = [];
    const token = store.get("token");
    let numPeticiones = 0;
    while (first > 0) {
      const response = await fetch(
        `${url}clips?broadcaster_id=${id}&first=${first > 50 ? 50 : first}${
          cursor === null ? "" : `&after=${cursor}`
        }`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Client-Id": process.env.CLIENTID,
            "accept-language": "",
          },
        }
      );
      numPeticiones++;
      const dataClipsByUser = await response.json();

      first = first - dataClipsByUser.data.length;
      dataClips = [...dataClips, ...dataClipsByUser.data];
      cursor = dataClipsByUser.pagination.cursor;
    }

    return { data: dataClips, requests: numPeticiones };
  } catch (error) {
    console.log(error);
  }
};

//Funcion para extraer Informacion del canal
export const getInformationChannel = async (id, first) => {
  try {
    const token = store.get("token");
    // let cursor = null;
    let dataChannel = [];
    let numPeticiones;
    while (first > 0) {
      const response = await fetch(
        `${url}channels?broadcaster_id=${id}&first=${first > 50 ? 50 : first}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Client-Id": process.env.CLIENTID,
            "accept-language": "",
          },
        }
      );
      numPeticiones++;
      const dataInformationChannel = await response.json();

      first = first - dataInformationChannel.data.length;
      dataChannel = [...dataChannel, ...dataInformationChannel.data];
      // cursor = dataInformationChannel.pagination.cursor;
    }
    return { data: dataChannel, requests: numPeticiones };
  } catch (error) {
    console.log(error);
  }
};

//Funcion para extraer la informacion del juego
export const getInformationGame = async (id, first) => {
  try {
    const token = store.get("token");
    // let cursor = null;
    let dataGames = [];
    let numPeticiones;

    while (first > 0) {
      const response = await fetch(
        `${url}games?id=${id}&first=${first > 50 ? 50 : first}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Client-Id": process.env.CLIENTID,
            "accept-language": "",
          },
        }
      );
      numPeticiones++;
      const dataInformationGame = await response.json();

      first = first - dataInformationGame.data.length;
      dataGames = [...dataGames, ...dataInformationGame.data];
      // cursor = dataInformationGame.pagination.cursor;
    }

    return { data: dataGames, requests: numPeticiones };
  } catch (error) {
    console.log(error);
  }
};
