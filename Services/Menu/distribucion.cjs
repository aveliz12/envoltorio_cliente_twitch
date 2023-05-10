const inquirer = require("inquirer");

const menuOptions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Cuántos datos desea consultar?",
    choices: [
      {
        value: "1",
        name: "Primera distribución.",
      },
      {
        value: "2",
        name: "Segunda distribución.",
      },
      {
        value: "3",
        name: "Tercera distribución.",
      },
      {
        value: "4",
        name: "Cuarta distribución.",
      },
      {
        value: "5",
        name: "Quinta distribución.",
      },
      {
        value: "6",
        name: "Sexta distribución.",
      },
      {
        value: "0",
        name: "Regresar",
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.log("==================================================".magenta);
  console.log("Seleccione una opcion: ".magenta);
  console.log("==================================================".magenta);

  const { opcion } = await inquirer.prompt(menuOptions);

  return opcion;
};

const distribucionDatosCaso1 = async () => {
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        return 1;
      case "2":
        return 50;
      case "3":
        return 250;
      case "4":
        return 3150;
      case "5":
        return 32800;
      case "6":
        return 100000;
      default:
        break;
    }
  } while (opt !== "0");
};
const distribucionDatosCaso2 = async () => {
  const data = {
    first: 0,
    firts2: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.first = 1;
        data.firts2 = 1;
        return data;
      case "2":
        data.first = 6;
        data.firts2 = 6;
        return data;
      case "3":
        data.first = 16;
        data.firts2 = 16;
        return data;
      case "4":
        data.first = 56;
        data.firts2 = 56;
        return data;
      case "5":
        data.first = 181;
        data.firts2 = 181;
        return data;
      case "6":
        data.first = 316;
        data.firts2 = 316;
        return data;
      default:
        break;
    }
  } while (opt !== "0");
};
const distribucionDatosCaso3 = async () => {
  const data = {
    first: 0,
    firts2: 0,
    firts3: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.first = 1;
        data.firts2 = 1;
        data.firts3 = 1;
        return data;
      case "2":
        data.first = 3;
        data.firts2 = 3;
        data.firts3 = 3;
        return data;
      case "3":
        data.first = 6;
        data.firts2 = 6;
        data.firts3 = 6;
        return data;
      case "4":
        data.first = 15;
        data.firts2 = 15;
        data.firts3 = 15;
        return data;
      case "5":
        data.first = 32;
        data.firts2 = 32;
        data.firts3 = 32;
        return data;
      case "6":
        data.first = 46;
        data.firts2 = 46;
        data.firts3 = 46;
        return data;
      default:
        break;
    }
  } while (opt !== "0");
};
const distribucionDatosCaso4 = async () => {
  const data = {
    first: 0,
    firts2: 0,
    firts3: 0,
    firts4: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.first = 1;
        data.firts2 = 1;
        data.firts3 = 1;
        data.firts4 = 1;
        return data;
      case "2":
        data.first = 3;
        data.firts2 = 3;
        data.firts3 = 3;
        data.firts4 = 1;
        return data;
      case "3":
        data.first = 6;
        data.firts2 = 6;
        data.firts3 = 6;
        data.firts4 = 1;
        return data;
      case "4":
        data.first = 15;
        data.firts2 = 15;
        data.firts3 = 15;
        data.firts4 = 1;
        return data;
      case "5":
        data.first = 32;
        data.firts2 = 32;
        data.firts3 = 32;
        data.firts4 = 1;
        return data;
      case "6":
        data.first = 46;
        data.firts2 = 46;
        data.firts3 = 46;
        data.firts4 = 1;
        return data;
      default:
        break;
    }
  } while (opt !== "0");
};
const distribucionDatosCaso5 = async () => {
  const data = {
    first: 0,
    firts2: 0,
    firts3: 0,
    firts4: 0,
    firts5: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.first = 1;
        data.firts2 = 1;
        data.firts3 = 1;
        data.firts4 = 1;
        data.firts5 = 1;
        return data;
      case "2":
        data.first = 3;
        data.firts2 = 3;
        data.firts3 = 3;
        data.firts4 = 1;
        data.firts5 = 1;
        return data;
      case "3":
        data.first = 6;
        data.firts2 = 6;
        data.firts3 = 6;
        data.firts4 = 1;
        data.firts5 = 1;
        return data;
      case "4":
        data.first = 15;
        data.firts2 = 15;
        data.firts3 = 15;
        data.firts4 = 1;
        data.firts5 = 1;
        return data;
      case "5":
        data.first = 32;
        data.firts2 = 32;
        data.firts3 = 32;
        data.firts4 = 1;
        data.firts5 = 1;
        return data;
      case "6":
        data.first = 46;
        data.firts2 = 46;
        data.firts3 = 46;
        data.firts4 = 1;
        data.firts5 = 1;
        return data;
      default:
        break;
    }
  } while (opt !== "0");
};

module.exports = {
  distribucionDatosCaso1,
  distribucionDatosCaso2,
  distribucionDatosCaso3,
  distribucionDatosCaso4,
  distribucionDatosCaso5,
};
