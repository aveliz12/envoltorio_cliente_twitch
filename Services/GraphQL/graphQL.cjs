const {
  DATA_CASOPRUEBA1,
  DATA_CASOPRUEBA2,
  DATA_CASOPRUEBA3,
  DATA_CASOPRUEBA4,
  DATA_CASOPRUEBA5,
} = require("./Cache/querys.cjs");
const fetch = require("node-fetch");

const {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} = require("@apollo/client/core");
const { performance } = require("perf_hooks");

const uri = "http://localhost:4000/";

/*____________________GRAPHQL SIN CACHE______________________________*/

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
  link: new HttpLink({ uri, fetch }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

//LIVE STREAMS
const casoPrueba1GraphQL = async (dataLength) => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA1,
    variables: {
      "first": dataLength,
    },
  });
  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log("<=================NIVEL 1 GRAPHQL=================>".red.bold);
  console.log(`La cantidad de datos es: ${response.data.getCasosPruebasLiveStreams.length}.`);
  console.log(`La consulta graphql tardó: ${segundos} segundos.`.red);
};

//VIDEOS BY GAME
const casoPrueba2GraphQL = async () => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA2,
  });

  //Agregar datos de videos por juego a un arreglo
  // const data = response.data.getCasosPruebasLiveStreams;
  // const videos = data.map((resp) => {
  //   return resp.videosByGame;
  // });

  // const allDataVideos = [].concat.apply([], videos);

  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log("<=================NIVEL 2 GRAPHQL=================>".red.bold);
  //console.log(allDataVideos.length, " datos.");
  console.log(`La consulta graphql tardó: ${segundos} segundos`.red);
};

//CLIPS BY USER
const casoPrueba3GraphQL = async () => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA3,
  });

  //Agregar a un arreglo todos los clips
  // const data = response.data.getCasosPruebasLiveStreams;

  // const allDataClips = [];
  // data.forEach((resp) => {
  //   resp.videosByGame.forEach((videos) => {
  //     videos.clipsByUser.forEach((clips) => {
  //       allDataClips.push(clips);
  //     });
  //   });
  // });

  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log("<=================NIVEL 3 GRAPHQL=================>".red.bold);
  //console.log(allDataClips.length);
  console.log(`La consulta graphql tardó: ${segundos} segundos`.red);
};

//INFORMATION CHANNEL
const casoPrueba4GraphQL = async () => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA4,
  });

  //Agregar a un arreglo todos los datos de informacion de canal
  // const data = response.data.getCasosPruebasLiveStreams;

  // const allDataInformationChannel = [];

  // data.forEach((resp) => {
  //   resp.videosByGame.forEach((videos) => {
  //     videos.clipsByUser.forEach((clips) => {
  //       clips.channelInformation.forEach((channel) => {
  //         allDataInformationChannel.push(channel);
  //       });
  //     });
  //   });
  // });

  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log("<=================NIVEL 4 GRAPHQL=================>".red);
  //console.log(allDataInformationChannel.length);
  console.log(`La consulta graphql tardó: ${segundos} segundos`.red);
};

//INFORMATION GAME
const casoPrueba5GraphQL = async () => {
  const t1 = performance.now();

  //CONSUMO
  const response = await client.query({
    query: DATA_CASOPRUEBA5,
  });

  //Agregar a un arreglo todos los datos de informacion de juego
  //const data = response.data.getCasosPruebasLiveStreams;

  // const allDataInformationGame = [];

  // data.forEach((resp) => {
  //   resp.videosByGame.forEach((videos) => {
  //     videos.clipsByUser.forEach((clips) => {
  //       clips.channelInformation.forEach((channel) => {
  //         channel.informationGame.forEach((game) => {
  //           allDataInformationGame.push(game);
  //         });
  //       });
  //     });
  //   });
  // });

  const t2 = performance.now();
  let segundos = ((t2 - t1) / 1000).toFixed(2);
  console.log("<=================NIVEL 5 GRAPHQL=================>".red.bold);
  //console.log(allDataInformationGame.length);
  console.log(`La consulta graphql tardó: ${segundos} segundos`.red);
};

module.exports = {
  casoPrueba1GraphQL,
  casoPrueba2GraphQL,
  casoPrueba3GraphQL,
  casoPrueba4GraphQL,
  casoPrueba5GraphQL,
};
