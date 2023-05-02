const inquirer = require("inquirer");

const menuOptions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Cuántos datos desea consultar?",
    choices: [
      {
        value: "1",
        name: "1 dato",
      },
      {
        value: "2",
        name: "50 datos",
      },
      {
        value: "3",
        name: "250 datos",
      },
      {
        value: "4",
        name: "3150 datos",
      },
      {
        value: "5",
        name: "32800 datos",
      },
      {
        value: "6",
        name: "100000 datos",
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

const distribucionDatos = async () => {
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

module.exports = {
  distribucionDatos,
};