import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();
import Storage from "node-storage";
const store = new Storage("./store");
//CACHE
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 600 });
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

//Funcion obtener LiveStreamsCache
export const getLiveStreamsCache = async () => {
  try {
    const token = store.get("token");
    const urlLiveStreams = `${url}streams`;
    const cacheKey = "dataLiveStreams";

    //Cache
    let cacheData = cache.get(cacheKey);
    if (cacheData === undefined) {
      const response = await fetch(urlLiveStreams, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Client-Id": process.env.CLIENTID,
        },
      });
      cacheData = await response.json();

      //console.log("Datos antes de agregar a cache: ", cacheData);
      cache.set(cacheKey, cacheData.data);
      //console.log("Datos después de agregar a cache: ", cache.get(cacheKey));

      console.log("DATOS DEL ENDPOINT");
      return cacheData.data;
    } else {
      console.log("ESTOS DATOS SON DE CACHE");
      return cacheData;
    }
  } catch (error) {
    console.log(error);
  }
};

//Funcion para extraer VideosByGame
export const getVideosByGame = async (id) => {
  try {
    const token = store.get("token");
    const response = await fetch(`${url}videos?game_id=${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Client-Id": process.env.CLIENTID,
        "accept-language": "",
      },
    });
    const dataVideosByGame = await response.json();
    return dataVideosByGame.data;
  } catch (error) {
    console.log(error);
  }
};

//Funcion para extraer Informacion del canal
export const getInformationChannel = async (id) => {
  try {
    const token = store.get("token");
    const response = await fetch(`${url}channels?broadcaster_id=${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Client-Id": process.env.CLIENTID,
        "accept-language": "",
      },
    });

    const dataInformationChannel = await response.json();
    return dataInformationChannel;
  } catch (error) {
    console.log(error);
  }
};

//Funcion para extraer clips por usuario
export const getClipsByUser = async (id) => {
  try {
    const token = store.get("token");
    const response = await fetch(`${url}clips?broadcaster_id=${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Client-Id": process.env.CLIENTID,
        "accept-language": "",
      },
    });

    const dataClipsByUser = await response.json();
    return dataClipsByUser;
  } catch (error) {
    console.log(error);
  }
};

//Funcion para extraer la informacion del juego
export const getInformationGame = async (id) => {
  try {
    const token = store.get("token");
    const response = await fetch(`${url}games?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Client-Id": process.env.CLIENTID,
        "accept-language": "",
      },
    });

    const dataInformationGame = await response.json();
    return dataInformationGame;
  } catch (error) {
    console.log(error);
  }
};
