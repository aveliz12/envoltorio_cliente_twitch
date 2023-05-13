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
    limite: 0,
    limite2: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.limite = 1;
        data.limite2 = 1;
        return data;
      case "2":
        data.limite = 6;
        data.limite2 = 6;
        return data;
      case "3":
        data.limite = 16;
        data.limite2 = 16;
        return data;
      case "4":
        data.limite = 56;
        data.limite2 = 56;
        return data;
      case "5":
        data.limite = 181;
        data.limite2 = 181;
        return data;
      case "6":
        data.limite = 316;
        data.limite2 = 316;
        return data;
      default:
        break;
    }
  } while (opt !== "0");
};
const distribucionDatosCaso3 = async () => {
  const data = {
    limite: 0,
    limite2: 0,
    limite3: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.limite = 1;
        data.limite2 = 1;
        data.limite3 = 1;
        return data;
      case "2":
        data.limite = 3;
        data.limite2 = 3;
        data.limite3 = 3;
        return data;
      case "3":
        data.limite = 6;
        data.limite2 = 6;
        data.limite3 = 6;
        return data;
      case "4":
        data.limite = 15;
        data.limite2 = 15;
        data.limite3 = 15;
        return data;
      case "5":
        data.limite = 32;
        data.limite2 = 32;
        data.limite3 = 32;
        return data;
      case "6":
        data.limite = 46;
        data.limite2 = 46;
        data.limite3 = 46;
        return data;
      default:
        break;
    }
  } while (opt !== "0");
};
const distribucionDatosCaso4 = async () => {
  const data = {
    limite: 0,
    limite2: 0,
    limite3: 0,
    limite4: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.limite = 1;
        data.limite2 = 1;
        data.limite3 = 1;
        data.limite4 = 1;
        return data;
      case "2":
        data.limite = 3;
        data.limite2 = 3;
        data.limite3 = 3;
        data.limite4 = 1;
        return data;
      case "3":
        data.limite = 6;
        data.limite2 = 6;
        data.limite3 = 6;
        data.limite4 = 1;
        return data;
      case "4":
        data.limite = 15;
        data.limite2 = 15;
        data.limite3 = 15;
        data.limite4 = 1;
        return data;
      case "5":
        data.limite = 32;
        data.limite2 = 32;
        data.limite3 = 32;
        data.limite4 = 1;
        return data;
      case "6":
        data.limite = 46;
        data.limite2 = 46;
        data.limite3 = 46;
        data.limite4 = 1;
        return data;
      default:
        break;
    }
  } while (opt !== "0");
};
const distribucionDatosCaso5 = async () => {
  const data = {
    limite: 0,
    limite2: 0,
    limite3: 0,
    limite4: 0,
    limite5: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.limite = 1;
        data.limite2 = 1;
        data.limite3 = 1;
        data.limite4 = 1;
        data.limite5 = 1;
        return data;
      case "2":
        data.limite = 3;
        data.limite2 = 3;
        data.limite3 = 3;
        data.limite4 = 1;
        data.limite5 = 1;
        return data;
      case "3":
        data.limite = 6;
        data.limite2 = 6;
        data.limite3 = 6;
        data.limite4 = 1;
        data.limite5 = 1;
        return data;
      case "4":
        data.limite = 15;
        data.limite2 = 15;
        data.limite3 = 15;
        data.limite4 = 1;
        data.limite5 = 1;
        return data;
      case "5":
        data.limite = 32;
        data.limite2 = 32;
        data.limite3 = 32;
        data.limite4 = 1;
        data.limite5 = 1;
        return data;
      case "6":
        data.limite = 46;
        data.limite2 = 46;
        data.limite3 = 46;
        data.limite4 = 1;
        data.limite5 = 1;
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
