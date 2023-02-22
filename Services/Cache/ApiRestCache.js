//CACHE
import fetch from "node-fetch";
import pkg from "@apollo/client/core/core.cjs";
const { ApolloClient, InMemoryCache, HttpLink } = pkg;
import {
  DATA_LIVESTREAMS,
  DATA_VIDEOSBYGAME,
  DATA_INFORMATIONCHANNEL,
  DATA_CLIPSBYUSER,
  DATA_INFORMATIONGAME,
} from "../Cache/querys.js";

/*____________________CACHE______________________________*/

const uri = "http://localhost:4000/";

const client = new ApolloClient({
  link: new HttpLink({ uri, fetch }),
  cache: new InMemoryCache(),
});

export const casoPrueba1Cache = async () => {
  const response = await client.query({
    query: DATA_LIVESTREAMS,
  });

  console.log(response.data);
};

export const casoPrueba2Cache = async () => {
  const response = await client.query({
    query: DATA_VIDEOSBYGAME,
    variables: {
      id: "id",
    },
  });

  console.log(response.data);
};

export const casoPrueba3Cache = async () => {
  const response = await client.query({
    query: DATA_INFORMATIONCHANNEL,
    variables: {
      id: "id",
    },
  });

  console.log(response.data);
};

export const casoPrueba4Cache = async () => {
  const response = await client.query({
    query: DATA_CLIPSBYUSER,
    variables: {
      id: "id",
    },
  });

  console.log(response.data);
};

export const casoPrueba5Cache = async () => {
  const response = await client.query({
    query: DATA_INFORMATIONGAME,
    variables: {
      id: "id",
    },
  });

  console.log(response.data);
};
