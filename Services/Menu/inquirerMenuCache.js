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
        name: "Con caché",
      },
      {
        value: "2",
        name: "Sin caché",
      },
      {
        value: "0",
        name: "Salir",
      },
    ],
  },
];

export const inquirerMenuCache = async () => {
  console.log("=================================".red);
  console.log("Seleccione una opcion: ".red);
  console.log("=================================".red);

  const { opcion } = await inquirer.prompt(menuOptions);

  return opcion;
};
