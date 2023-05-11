const { ApolloClient, InMemoryCache, gql } = require("@apollo/client/core");
const { RestLink } = require("apollo-link-rest");
const Storage = require("node-storage");
const store = new Storage("./store");
require("dotenv").config();
const fetch = require("node-fetch");
global.Headers = fetch.Headers;

const token = store.get("token");

const client = new ApolloClient({
  cache: new InMemoryCache(),
});

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
      const query = gql`
      query getLiveStreams {
        liveStreams @rest(type: "liveStreams", path: "streams?first=${
          first > 50 ? 50 : first
        }${cursor === null ? "" : `&after=${cursor}`}") {
          data
          pagination
        }
      }
    `;

      numPeticiones++;
      const response = await client.query({ query });

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
      const query = gql`
      query getVideosByGame {
        videosByGame @rest(type: "videosByGame", path: "videos?game_id=${id}&first=${
        first > 50 ? 50 : first
      }${cursor === null ? "" : `&after=${cursor}`}") {
          data
          pagination
        }
      }
    `;
      numPeticiones++;
      const response = await client.query({ query });

      first = first - response.data.videosByGame.data.length;
      dataVideos = [...dataVideos, ...response.data.videosByGame.data];
      cursor = response.data.videosByGame.pagination.cursor;
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
      const query = gql`
        query getClipsByUser {
          clipsUser @rest(type: "clipsUser", path: "clips?broadcaster_id=${id}&first=${
        first > 50 ? 50 : first
      }${cursor === null ? "" : `&after=${cursor}`}") {
            data
            pagination
          }
        }
      `;
      numPeticiones++;
      const response = await client.query({ query });

      first = first - response.data.clipsUser.data.length;
      dataClips = [...dataClips, ...response.data.clipsUser.data];
      cursor = response.data.clipsUser.pagination.cursor;
    }

    return { data: dataClips, requests: numPeticiones };
  } catch (error) {
    console.log(error);
  }
};

const getChannelInformationCache = async (id) => {
  try {
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
    const query = gql`
        query getChannelInformation {
          channelInfo @rest(type: "channelInfo", path: "channels?broadcaster_id=${id}") {
            data
          }
        }
      `;

    const response = await client.query({ query });
    return response.data.channelInfo.data;
  } catch (error) {
    console.log(error);
  }
};

const getGameInformationCache = async (id) => {
  try {
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
    const query = gql`
          query getGameInformation {
            gameInfo @rest(type: "gameInfo", path: "games?id=${id}") {
                data
            }
          }
        `;

    const response = await client.query({ query });

    return response.data.gameInfo.data;
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
