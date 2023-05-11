const inquirer = require("inquirer");

const menuOptions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: "1° Nivel: Transmisiones en vivo",
      },
      {
        value: "2",
        name: "2° Nivel: Video por juego",
      },
      {
        value: "3",
        name: "3° Nivel: Clips por usuario",
      },
      {
        value: "4",
        name: "4° Nivel: Información del canal",
      },
      {
        value: "5",
        name: "5° Nivel: Informacion del juego",
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
