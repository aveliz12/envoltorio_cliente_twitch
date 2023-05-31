const { gql } = require("@apollo/client/core");

const GET_TOKEN = gql`
  query getToken {
    getToken {
      access_token
      expires_in
      token_type
    }
  }
`;

const DATA_CASOPRUEBA1 = gql`
  query getDataCasoPrueba1($limitNivel1: Int) {
    getCasosPruebasLiveStreams(first: $limitNivel1) {
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

const DATA_CASOPRUEBA2 = gql`
  query getDataCasoPrueba2($limitNivel1: Int, $limitNivel2: Int) {
    getCasosPruebasLiveStreams(first: $limitNivel1) {
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
      videosByGame(first: $limitNivel2) {
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
  }
`;

const DATA_CASOPRUEBA3 = gql`
  query getDataCasoPrueba3(
    $limitNivel1: Int
    $limitNivel2: Int
    $limitNivel3: Int
  ) {
    getCasosPruebasLiveStreams(first: $limitNivel1) {
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
      videosByGame(first: $limitNivel2) {
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
        clipsByUser(first: $limitNivel3) {
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
    }
  }
`;

const DATA_CASOPRUEBA4 = gql`
  query getDataCasoPrueba4(
    $limitNivel1: Int
    $limitNivel2: Int
    $limitNivel3: Int
  ) {
    getCasosPruebasLiveStreams(first: $limitNivel1) {
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
      videosByGame(first: $limitNivel2) {
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
        clipsByUser(first: $limitNivel3) {
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
          channelInformation {
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
      }
    }
  }
`;

const DATA_CASOPRUEBA5 = gql`
  query getDataCasoPrueba5(
    $limitNivel1: Int
    $limitNivel2: Int
    $limitNivel3: Int
  ) {
    getCasosPruebasLiveStreams(first: $limitNivel1) {
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
      videosByGame(first: $limitNivel2) {
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
        clipsByUser(first: $limitNivel3) {
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
          channelInformation {
            broadcaster_id
            broadcaster_login
            broadcaster_name
            broadcaster_language
            game_id
            game_name
            title
            delay
            tags
            informationGame {
              id
              name
              box_art_url
              igdb_id
            }
          }
        }
      }
    }
  }
`;

module.exports = {
  DATA_CASOPRUEBA1,
  DATA_CASOPRUEBA2,
  DATA_CASOPRUEBA3,
  DATA_CASOPRUEBA4,
  DATA_CASOPRUEBA5,
};
