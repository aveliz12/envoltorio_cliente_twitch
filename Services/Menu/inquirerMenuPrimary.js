import inquirer from "inquirer";
import "colors";

const menuOptions = [
  {
    type: "list",
    name: "opcion",
    message: "Tipo de consumo",
    choices: [
      {
        value: "1",
        name: "Consultar datos de GraphQL desde caché",
      },
      {
        value:"2",
        name:"Consultar datos de API-REST desde caché"
      },
      {
        value: "3",
        name: "Consultar datos de API-REST",
      },
      {
        value: "0",
        name: "Salir",
      },
    ],
  },
];

const menuOptionsToken = [
  {
    type: "list",
    name: "opcionToken",
    message: "Token",
    choices: [
      {
        value: "1",
        name: "Generar nuevo token",
      },
      {
        value: "2",
        name: "No generar nuevo token",
      },
      {
        value: "0",
        name: "Salir",
      },
    ],
  },
];

export const inquirerMenuPrimary = async () => {
  console.log("=================================".red);
  console.log("Seleccione una opcion: ".red);
  console.log("=================================".red);

  const { opcion } = await inquirer.prompt(menuOptions);

  return opcion;
};

export const inquireMenuToken = async () => {
  console.log("==========================".green);
  console.log("Seleccione una opción: ".green);
  console.log("==========================".green);

  const { opcionToken } = await inquirer.prompt(menuOptionsToken);
  return opcionToken;
};
