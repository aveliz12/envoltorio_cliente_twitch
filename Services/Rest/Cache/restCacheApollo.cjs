const { ApolloClient, InMemoryCache, gql } = require("@apollo/client/core");
const { RestLink } = require("apollo-link-rest");
const Storage = require("node-storage");
const store = new Storage("./store");
require("dotenv").config();
const fetch = require("node-fetch");
global.Headers = fetch.Headers;
const {
  queryLiveStreams,
  queryVideosByGame,
  queryClipsByUser,
  queryChannelInfo,
  queryGameInfo,
} = require("../models/modelApolloRest.cjs");
const token = store.get("token");

const client = new ApolloClient({
  cache: new InMemoryCache(),
});

//LIVE STREAMS
const getLiveStreamsCache = async (first) => {
  try {
    let cursor = null;
    let numPeticiones = 0;
    let dataStreams = [];

    client.setLink(
      new RestLink({
        uri: "https://api.twitch.tv/helix/",
        customFetch: fetch,
        headers: {
          Authorization: "Bearer " + token,
          "Client-Id": process.env.CLIENTID,
        },
      })
    );
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

const getVideosByGameCache = async (id, first) => {
  try {
    let cursor = null;
    let numPeticiones = 0;
    let dataVideos = [];

    client.setLink(
      new RestLink({
        uri: "https://api.twitch.tv/helix/",
        customFetch: fetch,
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

      if (dataVideosByGame.data.length > 0) {
        first = first - dataVideosByGame.data.length;
        dataVideos = [...dataVideos, ...dataVideosByGame.data];
        if (
          dataVideosByGame.pagination.length > 0 ||
          dataVideosByGame.pagination.cursor !== undefined
        ) {
          cursor = dataVideosByGame.pagination.cursor;
          console.log(cursor);
        } else {
          break;
        }
      } else {
        break;
      }
    }

    return { data: dataVideos, requests: numPeticiones };
  } catch (error) {
    console.log(error);
  }
};

const getClipsByUserCache = async (id, first) => {
  try {
    let cursor = null;
    let numPeticiones = 0;
    let dataClips = [];

    client.setLink(
      new RestLink({
        uri: "https://api.twitch.tv/helix/",
        customFetch: fetch,
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
      if (dataClipsByUser.data.length > 0) {
        first = first - dataClipsByUser.data.length;
        dataClips = [...dataClips, ...dataClipsByUser.data];
        if (
          dataClipsByUser.pagination.length > 0 ||
          dataClipsByUser.pagination.cursor !== undefined
        ) {
          cursor = dataClipsByUser.pagination.cursor;
          console.log(cursor);
        } else {
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

const getChannelInformationCache = async (id) => {
  try {
    let numPeticiones = 0;
    let dataChannel = [];
    client.setLink(
      new RestLink({
        uri: "https://api.twitch.tv/helix/",
        customFetch: fetch,
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

    dataChannel = [...dataChannel, ...dataInformationChannel.data];

    return { data: dataChannel, requests: numPeticiones };
  } catch (error) {
    console.log(error);
  }
};

const getGameInformationCache = async (id) => {
  try {
    let numPeticiones = 0;
    let dataGames = [];
    client.setLink(
      new RestLink({
        uri: "https://api.twitch.tv/helix/",
        customFetch: fetch,
        headers: {
          Authorization: "Bearer " + token,
          "Client-Id": process.env.CLIENTID,
        },
      })
    );

    const response = await client.query({
      query: queryGameInfo,
      variables: {
        id,
      },
    });
    numPeticiones++;
    const dataInformationGame = response.data.gameInfo;

    dataGames = [...dataGames, ...dataInformationGame.data];

    return { dataGames: dataGames, requestsGames: numPeticiones };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getLiveStreamsCache,
  getVideosByGameCache,
  getClipsByUserCache,
  getChannelInformationCache,
  getGameInformationCache,
};
