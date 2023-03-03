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

const getLiveStreamsCache = async () => {
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
      query getLiveStreams {
        liveStreams @rest(type: "liveStreams", path: "streams") {
          data
        }
      }
    `;

    const response = await client.query({ query });
    console.log("NIVEL 1 CACHE");
    console.log(response.data.liveStreams.data.length, " datos");
    return response.data.liveStreams.data;
  } catch (error) {
    console.log(error);
  }
};

const getVideosByGameCache = async (id) => {
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
      query getVideosByGame {
        videosByGame @rest(type: "videosByGame", path: "videos?game_id=${id}") {
          data
        }
      }
    `;

    const response = await client.query({ query });
    console.log("NIVEL 2 CACHE");

    console.log(response.data.videosByGame.data.length, " datos");
    return response.data.videosByGame.data;
  } catch (error) {
    console.log(error);
  }
};

const getClipsByUserCache = async (id) => {
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
        query getClipsByUser {
          clipsUser @rest(type: "clipsUser", path: "clips?broadcaster_id=${id}") {
            data
          }
        }
      `;

    const response = await client.query({ query });
    console.log("NIVEL 3 CACHE");

    console.log(response.data.clipsUser.data.length, " datos");
    return response.data.clipsUser.data;
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
    console.log("NIVEL 4 CACHE");
    console.log(response.data.channelInfo.data.length, " datos");
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
    console.log("NIVEL 5 CACHE");

    console.log(response.data.gameInfo.data.length, " datos");
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
