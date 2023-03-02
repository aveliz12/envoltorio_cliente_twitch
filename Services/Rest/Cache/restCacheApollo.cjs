const { ApolloClient, InMemoryCache, gql } = require("@apollo/client/core");
const { RestLink } = require("apollo-link-rest");
const Storage = require("node-storage");
const store = new Storage("./store");
require("dotenv").config();
const fetch = require("node-fetch");
global.Headers=fetch.Headers;

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
          Authorization: "Bearer nwmi7budqmthy1wfuox5onr7z6wyv7",
          "Client-Id": "a2bf4j1rhkytvzoc4ortzn7m4yxg33",
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
    console.log(response.data.liveStreams.data);
    return response.data.liveStreams.data;
  } catch (error) {
    console.log("TRISTEEEEEEEEEE");
    console.log(error);
  }
};

const getVideosByGameCache = async (id) => {
  try {
    client.setLink(
      new RestLink({
        uri: "https://api.twitch.tv/helix/",
        headers: {
          Authorization: "Bearer " + token,
          "Client-Id": process.env.CLIENTID,
        },
      })
    );
    const query = gql`
      query getVideosByGame {
        videosByGame @rest(type: "videosByGame", path: "videos?game_id=${id}") {
          id
          stream_id
          user_id
          user_login
          user_name
          title
          description
          created_at
          published_at
          url
          thumbnail_url
          viewable
          view_count
          language
          type
          duration
          muted_segments
        }
      }
    `;

    const response = await client.query({ query });
    return response.data.videosByGame;
  } catch (error) {
    console.log(error);
  }
};

const getClipsByUserCache = async (id) => {
  try {
    client.setLink(
      new RestLink({
        uri: "https://api.twitch.tv/helix/",
        headers: {
          Authorization: "Bearer " + token,
          "Client-Id": process.env.CLIENTID,
        },
      })
    );
    const query = gql`
        query getClipsByUser {
          clipsUser @rest(type: "clipsUser", path: "clips?broadcaster_id=${id}") {
            id
            url
            embed_url
            broadcaster_id
            broadcaster_name
            creator_id
            creator_name
            video_id
            game_id
            language
            title
            view_count
            created_at
            thumbnail_url
            duration
            vod_offset
          }
        }
      `;

    const response = await client.query({ query });
    return response.data.clipsUser;
  } catch (error) {
    console.log(error);
  }
};

const getChannelInformationCache = async (id) => {
  try {
    client.setLink(
      new RestLink({
        uri: "https://api.twitch.tv/helix/",
        headers: {
          Authorization: "Bearer " + token,
          "Client-Id": process.env.CLIENTID,
        },
      })
    );
    const query = gql`
        query getChannelInformation {
          channelInfo @rest(type: "channelInfo", path: "channels?broadcaster_id=${id}") {
            broadcaster_id
            broadcaster_login
            broadcaster_name
            broadcaster_language
            game_id
            game_name
            title
            delay
            tags
          }
        }
      `;

    const response = await client.query({ query });
    return response.data.channelInfo;
  } catch (error) {
    console.log(error);
  }
};

const getGameInformationCache = async (id) => {
  try {
    client.setLink(
      new RestLink({
        uri: "https://api.twitch.tv/helix/",
        headers: {
          Authorization: "Bearer " + token,
          "Client-Id": process.env.CLIENTID,
        },
      })
    );
    const query = gql`
          query getGameInformation {
            gameInfo @rest(type: "gameInfo", path: "games?id=${id}") {
                id
                name
                box_art_url
                igdb_id
            }
          }
        `;

    const response = await client.query({ query });
    return response.data.gameInfo;
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
