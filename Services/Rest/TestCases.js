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

  return {
    data: data,
    time: tiempo,
    requests: numPeticiones,
  };
};

//CASO DE PRUEBA 2: VIDEOS BY GAME
export const casoPrueba2 = async (first, first2) => {
  try {
    let dataForCaso2 = [];
    let numPeticiones = 0;
    let totalDataVideos = 0;
    let datCaso1, requestsCaso1;
    let t1 = performance.now();

    do {
      const caso1 = await casoPrueba1(first);
      datCaso1 = caso1.data;
      requestsCaso1 = caso1.requests;
      const idGame = datCaso1.map((resp) => resp.game_id);
      let idFound = false;

      for (const iDs of idGame) {
        if (iDs.trim() === "") {
          console.log("ID vacío encontrado. Saltando consulta de videos...");
          continue;
        }
        console.log("CONSULTA DE VIDEOS CON EL ID: ", iDs);
        const { data, requests } = await getVideosByGame(iDs, first2);
        if (data.length >= first2 && data.length > 0) {
          dataForCaso2.push(...data);
          totalDataVideos++;
          numPeticiones += requests;
          idFound = true;
        }
        console.log(totalDataVideos);
        console.log(
          "DATOS OBTENIDOS VIDEOS:",
          dataForCaso2.length,
          " de ",
          datCaso1.length,
          " IDFOUND ",
          idFound
        );
        if (totalDataVideos >= first) {
          break;
        }
      }
      if (!idFound) {
        console.log(
          "No se encontraron suficientes datos con los IDs actuales. Consultando con nuevos IDs..."
        );
      }
    } while (totalDataVideos < first);
    if (totalDataVideos > first) {
      //se utiliza el método slice para reducir la longitud del arreglo dataVideosForCaso2 a first elementos
      dataForCaso2 = dataForCaso2.slice(0, first);
      totalDataVideos = first;
    }
    const totalPeticiones = requestsCaso1 + numPeticiones;
    let t2 = performance.now();
    const tiempo = getTime(t1, t2);
    return {
      data2: dataForCaso2,
      time2: tiempo,
      requests2: totalPeticiones,
    };
  } catch (error) {
    console.log(error);
  }
};

//CASO DE PRUEBA 3: CLIPS BY USER
export const casoPrueba3 = async (first, first2, first3) => {
  let dataForCaso3 = [];
  let totalDataClips = 0;
  let numPeticiones = 0;
  let dataCaso2, requestCaso2;
  let t1 = performance.now();
  do {
    const result = await casoPrueba2(first, first2);
    dataCaso2 = result.data2;
    requestCaso2 = result.requests2;
    let idFound = false;

    const idUserVideos = dataCaso2.map((resp) => resp.user_id);
    for (const iDs of idUserVideos) {
      console.log("CONSULTA DE CLIPS CON EL ID: ", iDs);

      const { data, requests } = await getClipsByUser(iDs, first3);
      if (data.length >= first3 && data.length > 0) {
        dataForCaso3.push(...data);
        totalDataClips++;
        numPeticiones += requests;
        idFound = true;
      }
      console.log(totalDataClips);

      console.log(
        "CONSULTANDO... CLIPS ",
        totalDataClips,
        " de ",
        dataCaso2.length,
        " IDFOUND ",
        idFound
      );
      if (totalDataClips >= dataCaso2.length) {
        break;
      }
    }
    if (!idFound) {
      console.log(
        "No se encontraron suficientes datos con los IDs actuales. Consultando con nuevos IDs..."
      );
    }
  } while (totalDataClips < dataCaso2.length);
  if (totalDataClips > dataCaso2.length) {
    dataForCaso3 = dataForCaso3.slice(0, dataCaso2.length);
    totalDataClips = dataCaso2.length;
  }
  const totalPeticiones = requestCaso2 + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);
  return {
    data3: dataForCaso3,
    time3: tiempo,
    requests3: totalPeticiones,
  };
};

//CASO DE PRUEBA 4: INFORMATION CHANNEL
export const casoPrueba4 = async (first, first2, first3) => {
  let t1 = performance.now();
  let numPeticiones = 0;
  let allData = [];
  const { data3, requests3 } = await casoPrueba3(first, first2, first3);
  const broadcaster_id = [];
  data3.forEach((id) => {
    broadcaster_id.push(id.broadcaster_id);
  });

  console.log("INICIO CASO 4");
  for (const _id of broadcaster_id) {
    const { data, requests } = await getInformationChannel(_id);
    allData = [...allData, ...data];
    console.log(
      "DATOS NIVEL 4: ",
      allData.length,
      " DE ",
      data3.length,
      " con el ID: ",
      _id
    );
    numPeticiones += requests;
  }

  const totalPeticiones = requests3 + numPeticiones;
  let t2 = performance.now();
  const tiempo = getTime(t1, t2);

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

  const { data4, requests4 } = await casoPrueba4(first, first2, first3);
  const dataInformationChannel = data4;

  const dataGame = [];

  dataInformationChannel.forEach((id) => {
    dataGame.push(id.game_id);
  });

  console.log("INICIO CASO 5");
  for (const _id of dataGame) {
    const { data, requests } = await getInformationGame(_id);
    allData = [...allData, ...data];
    numPeticiones += requests;
    console.log(
      "DATOS NIVEL 5: ",
      allData.length,
      " DE ",
      data4.length,
      " con el ID: ",
      _id
    );
  }

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
