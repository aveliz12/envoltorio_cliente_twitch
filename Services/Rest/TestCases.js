import pkg from "./ApiRest.cjs";

const {
  getLiveStreams,
  getVideosByGame,
  getInformationChannel,
  getClipsByUser,
  getInformationGame,
} = pkg;
import { performance } from "perf_hooks";

/*____________________REST SIN CACHE______________________________*/

const getTime = (t1, t2) => {
  const milisegundos = (t2 - t1).toFixed(3);
  const segundos = ((t2 - t1) / 1000).toFixed(3);
  const minutos = ((t2 - t1) / 60000).toFixed(3);
  const tiempo = {
    milisegundos,
    segundos,
    minutos,
  };

  return tiempo;
};

//CASO DE PRUEBA 1: LIVE STREAMS
export const casoPrueba1 = async (first) => {
  let t1 = performance.now();
  const { data, requests } = await getLiveStreams(first);
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  const numPeticiones = requests;
  //console.log(`Datos del nivel 1: ${data.length}.`.underline);

  return {
    data: data,
    time: tiempo,
    requests: numPeticiones,
  };
};

//Obtener iDs que contengan la cantidad de datos establecida en el nivel 2
const getDataForCaso2 = async (first, first2) => {
  try {
    console.log("DATA PARA CASO DE PRUEBA 2");
    let dataVideosForCaso2 = [];
    let numPeticiones = 0;
    let totalDataVideos = 0;
    let response;

    do {
      const {data, requests } = await casoPrueba1(first);

      const idGame = data.map((resp) => resp.game_id);
      for (const iDs of idGame) {
        if (iDs !== null) {
          response = await getVideosByGame(iDs, first2);
        }
        if (response?.data?.length >= first2 && response?.data?.length > 0) {
          dataVideosForCaso2.push(iDs);
          totalDataVideos++;
        }

        if (totalDataVideos >= first) {
          break;
        }
      }

      if (totalDataVideos > first) {
        //se utiliza el método slice para reducir la longitud del arreglo dataVideosForCaso2 a first elementos
        dataVideosForCaso2 = dataVideosForCaso2.slice(0, first);
        totalDataVideos = first;
        break;
      }

      numPeticiones = requests;
      // console.log(
      //   "PARA CASO 2._Cantidad de IDs con mas datos que ",
      //   first2,
      //   ": ",
      //   dataVideosForCaso2.length
      // );

      // if (totalDataVideos < first) {
      //   console.log(
      //     `PARA CASO 2._Se encontraron ${dataVideosForCaso2.length} IDs con más de ${first2} datos. Realizando nuevas consultas...`
      //   );
      // }
    } while (totalDataVideos === first);
    console.log("DATOS EXTRAIDOS, PASO A CASO 2");
    return {
      data: dataVideosForCaso2,
      requests: numPeticiones,
    };
  } catch (error) {
    console.log(error);
  }
};

//CASO DE PRUEBA 2: VIDEOS BY GAME
export const casoPrueba2 = async (first, first2) => {
  let t1 = performance.now();
  let numPeticiones = 0;
  let objetos = [];
  const { data, requests } = await getDataForCaso2(first, first2);
  console.log("EN CASO DE PRUEBA 2");
  for (const game_id of data) {
    console.log("ID DE GAME_ID CASO 2:", game_id);
    const { data, requests } = await getVideosByGame(game_id, first2);
    numPeticiones += requests;
    objetos = [...objetos, ...data];
  }
  const totalPeticiones = requests + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  //console.log(`Datos del nivel 2: ${objetos.length}.`.underline);

  return {
    data2: objetos,
    time2: tiempo,
    requests2: totalPeticiones,
  };
};

//Obtener iDs que contengan la cantidad de datos establecida en el nivel 2
const getDataForCaso3 = async (first, first2, first3) => {
  try {
    console.log("DATA PARA CASO DE PRUEBA 3");

    let dataVideosForCaso3 = [];
    let totalDataVideos = 0;
    let numPeticiones;
    let data;
    let requests2 = 0;

    do {
      const result = await casoPrueba2(first, first2);
      data = result.data2;
      requests2 = result.requests2;

      const idUserVideos = data.map((resp) => resp.user_id);
      for (const iDs of idUserVideos) {
        console.log("EXTRAYENDO DATOS PARA CASO 3");

        const response = await getClipsByUser(iDs, first3);
        if (response?.data?.length >= first3 && response?.data?.length > 0) {
          dataVideosForCaso3.push(iDs);
          totalDataVideos++;
        }
        if (totalDataVideos >= data.length) {
          break;
        }
      }

      if (totalDataVideos > data.length) {
        dataVideosForCaso3 = dataVideosForCaso3.slice(0, data.length);
        totalDataVideos = data.length;
        break;
      }

      // console.log(
      //   "PARA CASO 3._Cantidad de IDs con mas datos que ",
      //   first3,
      //   ": ",
      //   dataVideosForCaso3.length
      // );

      // if (totalDataVideos < data.length) {
      //   console.log(
      //     `PARA CASO 3._Se encontraron ${dataVideosForCaso3.length} IDs con más de ${first3} datos. Realizando nuevas consultas...`
      //   );
      // }
    } while (totalDataVideos !== data.length);
    console.log("DATOS EXTRAIDOS, PASO A CASO 3");
    numPeticiones = requests2;
    return {
      data: dataVideosForCaso3,
      resquests2: numPeticiones,
    };
  } catch (error) {
    console.log(error);
  }
};

//CASO DE PRUEBA 3: CLIPS BY USER
export const casoPrueba3 = async (first, first2, first3) => {
  let t1 = performance.now();
  let allData = [];
  let numPeticiones = 0;
  console.log("EN CASO DE PRUEBA 3");
  const { data, resquests2 } = await getDataForCaso3(
    first,
    first2,
    first3
  );
  // const { data, requests2 } = await casoPrueba2(first, first2);
  // const dataVideosByGame = data;
  // const idUserVideos = dataVideosByGame.map((resp) => resp.user_id);
  for (const broadcaster_id of data) {
    const { data, requests } = await getClipsByUser(broadcaster_id, first3);
    numPeticiones += requests;
    console.log("Consultando ", numPeticiones);
    allData = [...allData, ...data];
  }
  const totalPeticiones = resquests2 + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

  //console.log(`Datos del nivel 3: ${allData.length}.`.underline);

  return {
    data3: allData,
    time3: tiempo,
    requests3: totalPeticiones,
  };
};

//CASO DE PRUEBA 4: INFORMATION CHANNEL
export const casoPrueba4 = async (first, first2, first3) => {
  let t1 = performance.now();
  let numPeticiones = 0;
  let allData = [];
  const { totalData3, data3, requests3 } = await casoPrueba3(
    first,
    first2,
    first3
  );
  const dataClipsByUser = data3;
  const broadcaster_id = [];
  dataClipsByUser.forEach((id) => {
    broadcaster_id.push(id.broadcaster_id);
  });

  for (const _id of broadcaster_id) {
    const { data, requests } = await getInformationChannel(_id);
    allData = [...allData, ...data];
    numPeticiones += requests;
  }

  // const dataInformationChannel = broadcaster_id.map(async (_id) => {
  //   return (await getInformationChannel(_id, first4)).data;
  // });

  // const allDataInformationChannel = await Promise.all(dataInformationChannel);

  // var allData = [].concat.apply(
  //   [],
  //   allDataInformationChannel.map((arr) => {
  //     return arr;
  //   })
  // );
  const totalPeticiones = requests3 + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  //console.log(`Datos del nivel 4: ${allData.length}.`.underline);

  return {
    data4: allData,
    time4: tiempo,
    requests4: totalPeticiones,
  };
};

//CASO DE PRUEBA 5: INFORMATION GAME
export const casoPrueba5 = async (first, first2, first3) => {
  let t1 = performance.now();
  let numPeticiones = 0;
  let allData = [];
  const { totalData4, data4, requests4 } = await casoPrueba4(
    first,
    first2,
    first3
  );
  const dataInformationChannel = data4;

  const dataGame = [];

  dataInformationChannel.forEach((id) => {
    dataGame.push(id.game_id);
  });

  for (const _id of dataGame) {
    const { data, requests } = await getInformationGame(_id);
    allData = [...allData, ...data];
    numPeticiones += requests;
  }

  // const dataInformationGame = dataGame.map(async (_id) => {
  //   numPeticiones = (await getInformationGame(_id, first5)).requests;
  //   return (await getInformationGame(_id, first5)).data;
  // });

  // const allData = await Promise.all(dataInformationGame);

  // var allDataInformationGame = [].concat.apply(
  //   [],
  //   allData.map((arr) => {
  //     return arr;
  //   })
  // );

  const totalPeticiones = requests4 + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  //console.log(`Datos del nivel 5: ${allData.length}.`.underline);

  return {
    data5: allData,
    time5: tiempo,
    requests5: totalPeticiones,
  };
};
