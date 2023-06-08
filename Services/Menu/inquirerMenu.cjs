const inquirer = require("inquirer");

const menuOptions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: "Primer Nivel: Transmisiones en vivo.",
      },
      {
        value: "2",
        name: "Segundo Nivel: Videos por juego.",
      },
      {
        value: "3",
        name: "Tercer Nivel: Clips por usuario.",
      },
      {
        value: "4",
        name: "Cuarto Nivel: Información del canal de un usuario.",
      },
      {
        value: "5",
        name: "Quinto Nivel: Información de un juego.",
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

module.exports = {
  inquirerMenu,
};
