const fetch = require("node-fetch");
// import * as dotenv from "dotenv";
// dotenv.config();
require("dotenv").config();
const Storage = require("node-storage");
const {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
} = require("@apollo/client/core");
const { RestLink } = require("apollo-link-rest");
global.Headers = fetch.Headers;
const axios = require("axios");
const { buildAxiosFetch } = require("@lifeomic/axios-fetch");
const {
  queryLiveStreams,
  queryVideosByGame,
  queryClipsByUser,
  queryChannelInfo,
  queryGameInfo,
} = require("./models/modelApolloRest.cjs");
//VARIABLES
const store = new Storage("./store");
/* Configuración del tiempo de espera en apollo client */
const instanceAxios = axios.create({
  timeout: 7200000,
});

const uri = "https://api.twitch.tv/helix/";
const params = new URLSearchParams();
params.append("client_id", process.env.CLIENTID);
params.append("client_secret", process.env.CLIENTSECRET);
params.append("grant_type", process.env.GRANTTYPE);

//No usar cache
const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  link: new HttpLink({ uri, fetch: buildAxiosFetch(instanceAxios) }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

//Solicitar Token
//Funcion Obtener token
const getToken = async () => {
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
const getLiveStreams = async (first) => {
  try {
    let cursor = null;
    let dataStreams = [];
    const token = store.get("token");
    let numPeticiones = 0;

    client.setLink(
      new RestLink({
        uri: "https://api.twitch.tv/helix/",
        //customFetch: fetch,
        headers: {
          Authorization: "Bearer " + token,
          "Client-Id": process.env.CLIENTID,
        },
      })
    );
    //CONSULTA
    while (first > 0) {
      const response = await client.query({
        query: queryLiveStreams,
        variables: {
          limitNivel1: first > 50 ? 50 : first,
          cursor: cursor === null ? "" : `&after=${cursor}`,
        },
      });

      numPeticiones++;
      first = first - response.data.liveStreams.data.length;
      dataStreams = [...dataStreams, ...response.data.liveStreams.data];
      cursor = response.data.liveStreams.pagination.cursor;
    }
    return { data: dataStreams, requests: numPeticiones };
  } catch (error) {
    console.log(error);
  }
};

//Funcion para extraer VideosByGame
const getVideosByGame = async (id, first) => {
  try {
    let cursor = null;
    let dataVideos = [];
    let numPeticiones = 0;
    const token = store.get("token");
    //CONSULTA
    client.setLink(
      new RestLink({
        uri: "https://api.twitch.tv/helix/",
        //customFetch: fetch,
        headers: {
          Authorization: "Bearer " + token,
          "Client-Id": process.env.CLIENTID,
        },
      })
    );
    while (first > 0) {
      const response = await client.query({
        query: queryVideosByGame,
        variables: {
          id,
          limitNivel2: first > 50 ? 50 : first,
          cursor: cursor === null ? "" : `&after=${cursor}`,
        },
      });
      numPeticiones++;
      const dataVideosByGame = response.data.videosByGame;
      if (
        dataVideosByGame?.data?.length > 0 ||
        dataVideosByGame?.pagination?.length > 0
      ) {
        first = first - dataVideosByGame.data.length;
        dataVideos = [...dataVideos, ...dataVideosByGame.data];
        cursor = dataVideosByGame.pagination.cursor;
      } else {
        break;
      }
    }
    return { data: dataVideos, requests: numPeticiones };
  } catch (error) {
    console.log(error);
  }
};

//Funcion para extraer clips por usuario
const getClipsByUser = async (id, first) => {
  try {
    let cursor = null;
    let dataClips = [];
    const token = store.get("token");
    let numPeticiones = 0;

    //CONSULTA
    client.setLink(
      new RestLink({
        uri: "https://api.twitch.tv/helix/",
        //customFetch: fetch,
        headers: {
          Authorization: "Bearer " + token,
          "Client-Id": process.env.CLIENTID,
        },
      })
    );

    while (first > 0) {
      const response = await client.query({
        query: queryClipsByUser,
        variables: {
          id,
          limitNivel3: first > 50 ? 50 : first,
          cursor: cursor === null ? "" : `&after=${cursor}`,
        },
      });
      numPeticiones++;
      const dataClipsByUser = response.data.clipsUser;
      if (
        dataClipsByUser?.data?.length > 0 ||
        dataClipsByUser?.pagination?.length > 0
      ) {
        first = first - dataClipsByUser.data.length;
        dataClips = [...dataClips, ...dataClipsByUser.data];
        if (dataClipsByUser.pagination.cursor !== undefined) {
          cursor = dataClipsByUser.pagination.cursor;
          console.log("CURSOR DE CLIPS", cursor);
          break;
        }
      } else {
        break;
      }
    }

    return { data: dataClips, requests: numPeticiones };
  } catch (error) {
    console.log(error);
  }
};

//Funcion para extraer Informacion del canal
const getInformationChannel = async (id) => {
  try {
    const token = store.get("token");
    let dataChannel = [];
    let numPeticiones = 0;

    //CONSULTA
    client.setLink(
      new RestLink({
        uri: "https://api.twitch.tv/helix/",
        //customFetch: fetch,
        headers: {
          Authorization: "Bearer " + token,
          "Client-Id": process.env.CLIENTID,
        },
      })
    );
    const response = await client.query({
      query: queryChannelInfo,
      variables: {
        id,
      },
    });
    numPeticiones++;

    const dataInformationChannel = response.data.channelInfo;

    //first = first - dataInformationChannel.data.length;
    dataChannel = [...dataChannel, ...dataInformationChannel.data];
    // cursor = dataInformationChannel.pagination.cursor;

    return { data: dataChannel, requests: numPeticiones };
  } catch (error) {
    console.log(error);
  }
};

//Funcion para extraer la informacion del juego
const getInformationGame = async (id) => {
  try {
    const token = store.get("token");
    // let cursor = null;
    let dataGames = [];
    let numPeticiones = 0;

    //CONSULTAS
    client.setLink(
      new RestLink({
        uri: "https://api.twitch.tv/helix/",
        //customFetch: fetch,
        headers: {
          Authorization: "Bearer " + token,
          "Client-Id": process.env.CLIENTID,
        },
      })
    );
    //while (first > 0) {
    const response = await client.query({
      query: queryGameInfo,
      variables: {
        id,
      },
    });
    numPeticiones++;
    const dataInformationGame = response.data.gameInfo;

    //first = first - dataInformationGame.data.length;
    dataGames = [...dataGames, ...dataInformationGame.data];
    // cursor = dataInformationGame.pagination.cursor;
    //}

    return { data: dataGames, requests: numPeticiones };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getToken,
  getLiveStreams,
  getVideosByGame,
  getClipsByUser,
  getInformationChannel,
  getInformationGame,
};
