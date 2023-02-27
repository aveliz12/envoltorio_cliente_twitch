import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core/core.cjs";
import { RestLink } from "apollo-link-rest";
import Storage from "node-storage";
const store = new Storage("./store");
import * as dotenv from "dotenv";
dotenv.config();

const token = store.get("token");

const restLink = new RestLink({
  uri: "https://api.twitch.tv/helix/",
  headers: {
    Authorization: "Bearer " + token,
    "Client-Id": process.env.CLIENTID,
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
});

export const getLiveStreamsCache = async () => {
  try {
    client.setLink(restLink);
    const query = gql`
      query getLiveStreams {
        liveStreams @rest(type: "liveStreams", path: "streams") {
          id
          user_id
          user_login
          user_name
          game_id
          game_name
          type
          title
          viewer_count
          started_at
          language
          thumbnail_url
          tag_ids
          tags
          is_mature
        }
      }
    `;

    const response = await client.query({ query });
    return response.data.liveStreams;
  } catch (error) {
    console.log(error);
  }
};

export const getVideosByGameCache = async (id) => {
  try {
    client.setLink(restLink);
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

export const getClipsByUserCache = async (id) => {
  try {
    client.setLink(restLink);
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

export const getChannelInformationCache = async (id) => {
  try {
    client.setLink(restLink);
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

export const getGameInformationCache = async (id) => {
  try {
    client.setLink(restLink);
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
