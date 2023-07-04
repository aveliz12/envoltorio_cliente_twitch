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
    limiteNivel1: 0,
    limiteNivel2: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.limiteNivel1 = 1;
        data.limiteNivel2 = 1;
        return data;
      case "2":
        data.limiteNivel1 = 6;
        data.limiteNivel2 = 6;
        return data;
      case "3":
        data.limiteNivel1 = 16;
        data.limiteNivel2 = 16;
        return data;
      case "4":
        data.limiteNivel1 = 56;
        data.limiteNivel2 = 56;
        return data;
      case "5":
        data.limiteNivel1 = 181;
        data.limiteNivel2 = 181;
        return data;
      case "6":
        data.limiteNivel1 = 316;
        data.limiteNivel2 = 316;
        return data;
      default:
        break;
    }
  } while (opt !== "0");
};
const distribucionDatosCaso3 = async () => {
  const data = {
    limiteNivel1: 0,
    limiteNivel2: 0,
    limiteNivel3: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.limiteNivel1 = 1;
        data.limiteNivel2 = 1;
        data.limiteNivel3 = 1;
        return data;
      case "2":
        data.limiteNivel1 = 3;
        data.limiteNivel2 = 3;
        data.limiteNivel3 = 3;
        return data;
      case "3":
        data.limiteNivel1 = 6;
        data.limiteNivel2 = 6;
        data.limiteNivel3 = 6;
        return data;
      case "4":
        data.limiteNivel1 = 15;
        data.limiteNivel2 = 15;
        data.limiteNivel3 = 15;
        return data;
      case "5":
        data.limiteNivel1 = 32;
        data.limiteNivel2 = 32;
        data.limiteNivel3 = 32;
        return data;
      case "6":
        data.limiteNivel1 = 46;
        data.limiteNivel2 = 46;
        data.limiteNivel3 = 46;
        return data;
      default:
        break;
    }
  } while (opt !== "0");
};
const distribucionDatosCaso4 = async () => {
  const data = {
    limiteNivel1: 0,
    limiteNivel2: 0,
    limiteNivel3: 0,
    limiteNivel4: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.limiteNivel1 = 1;
        data.limiteNivel2 = 1;
        data.limiteNivel3 = 1;
        data.limiteNivel4 = 1;
        return data;
      case "2":
        data.limiteNivel1 = 3;
        data.limiteNivel2 = 3;
        data.limiteNivel3 = 3;
        data.limiteNivel4 = 1;
        return data;
      case "3":
        data.limiteNivel1 = 6;
        data.limiteNivel2 = 6;
        data.limiteNivel3 = 6;
        data.limiteNivel4 = 1;
        return data;
      case "4":
        data.limiteNivel1 = 15;
        data.limiteNivel2 = 15;
        data.limiteNivel3 = 15;
        data.limiteNivel4 = 1;
        return data;
      case "5":
        data.limiteNivel1 = 32;
        data.limiteNivel2 = 32;
        data.limiteNivel3 = 32;
        data.limiteNivel4 = 1;
        return data;
      case "6":
        data.limiteNivel1 = 46;
        data.limiteNivel2 = 46;
        data.limiteNivel3 = 46;
        data.limiteNivel4 = 1;
        return data;
      default:
        break;
    }
  } while (opt !== "0");
};
const distribucionDatosCaso5 = async () => {
  const data = {
    limiteNivel1: 0,
    limiteNivel2: 0,
    limiteNivel3: 0,
    limiteNivel4: 0,
    limiteNivel5: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.limiteNivel1 = 1;
        data.limiteNivel2 = 1;
        data.limiteNivel3 = 1;
        data.limiteNivel4 = 1;
        data.limiteNivel5 = 1;
        return data;
      case "2":
        data.limiteNivel1 = 3;
        data.limiteNivel2 = 3;
        data.limiteNivel3 = 3;
        data.limiteNivel4 = 1;
        data.limiteNivel5 = 1;
        return data;
      case "3":
        data.limiteNivel1 = 6;
        data.limiteNivel2 = 6;
        data.limiteNivel3 = 6;
        data.limiteNivel4 = 1;
        data.limiteNivel5 = 1;
        return data;
      case "4":
        data.limiteNivel1 = 15;
        data.limiteNivel2 = 15;
        data.limiteNivel3 = 15;
        data.limiteNivel4 = 1;
        data.limiteNivel5 = 1;
        return data;
      case "5":
        data.limiteNivel1 = 32;
        data.limiteNivel2 = 32;
        data.limiteNivel3 = 32;
        data.limiteNivel4 = 1;
        data.limiteNivel5 = 1;
        return data;
      case "6":
        data.limiteNivel1 = 46;
        data.limiteNivel2 = 46;
        data.limiteNivel3 = 46;
        data.limiteNivel4 = 1;
        data.limiteNivel5 = 1;
        return data;
      default:
        break;
    }
  } while (opt !== "0");
};

/*---------------------------------------------PARA GRAPHQL----------------------------------------*/
const distribucionDatosCaso2GraphQL = async () => {
  const data = {
    limiteNivel1: 0,
    limiteNivel2: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.limiteNivel1 = 1;
        data.limiteNivel2 = 1;
        return data;
      case "2":
        data.limiteNivel1 = 6;
        data.limiteNivel2 = 6;
        return data;
      case "3":
        data.limiteNivel1 = 16;
        data.limiteNivel2 = 16;
        return data;
      case "4":
        data.limiteNivel1 = 56;
        data.limiteNivel2 = 56;
        return data;
      case "5":
        data.limiteNivel1 = 181;
        data.limiteNivel2 = 181;
        return data;
      case "6":
        // data.limiteNivel1 = 316;
        // data.limiteNivel2 = 316;
        // return data;
        console.log(
          "No es posible ingresar esta distribución. Error: Full requests."
            .bgRed.bold
        );
      default:
        break;
    }
  } while (opt !== "0");
};

const distribucionDatosCaso3GraphQL = async () => {
  const data = {
    limiteNivel1: 0,
    limiteNivel2: 0,
    limiteNivel3: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.limiteNivel1 = 1;
        data.limiteNivel2 = 1;
        data.limiteNivel3 = 1;
        return data;
      case "2":
        data.limiteNivel1 = 3;
        data.limiteNivel2 = 3;
        data.limiteNivel3 = 3;
        return data;
      case "3":
        data.limiteNivel1 = 6;
        data.limiteNivel2 = 6;
        data.limiteNivel3 = 6;
        return data;
      case "4":
        data.limiteNivel1 = 15;
        data.limiteNivel2 = 15;
        data.limiteNivel3 = 15;
        return data;
      case "5":
        data.limiteNivel1 = 32;
        data.limiteNivel2 = 32;
        data.limiteNivel3 = 32;
        return data;
      case "6":
        // data.limiteNivel1 = 46;
        // data.limiteNivel2 = 46;
        // data.limiteNivel3 = 46;
        // return data;
        console.log(
          "No es posible ingresar esta distribución. Error: Full requests."
            .bgRed.bold
        );
      default:
        break;
    }
  } while (opt !== "0");
};

const distribucionDatosCaso4GraphQL = async () => {
  const data = {
    limiteNivel1: 0,
    limiteNivel2: 0,
    limiteNivel3: 0,
    limiteNivel4: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.limiteNivel1 = 1;
        data.limiteNivel2 = 1;
        data.limiteNivel3 = 1;
        data.limiteNivel4 = 1;
        return data;
      case "2":
        data.limiteNivel1 = 3;
        data.limiteNivel2 = 3;
        data.limiteNivel3 = 3;
        data.limiteNivel4 = 1;
        return data;
      case "3":
        data.limiteNivel1 = 6;
        data.limiteNivel2 = 6;
        data.limiteNivel3 = 6;
        data.limiteNivel4 = 1;
        return data;
      case "4":
        data.limiteNivel1 = 15;
        data.limiteNivel2 = 15;
        data.limiteNivel3 = 15;
        data.limiteNivel4 = 1;
        return data;
      case "5":
        data.limiteNivel1 = 32;
        data.limiteNivel2 = 32;
        data.limiteNivel3 = 32;
        data.limiteNivel4 = 1;
        return data;
      case "6":
        // data.limiteNivel1 = 46;
        // data.limiteNivel2 = 46;
        // data.limiteNivel3 = 46;
        // data.limiteNivel4 = 1;

        // return data;
        console.log(
          "No es posible ingresar esta distribución. Error: Full requests."
            .bgRed.bold
        );
      default:
        break;
    }
  } while (opt !== "0");
};
const distribucionDatosCaso5GraphQL = async () => {
  const data = {
    limiteNivel1: 0,
    limiteNivel2: 0,
    limiteNivel3: 0,
    limiteNivel4: 0,
    limiteNivel5: 0,
  };
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        data.limiteNivel1 = 1;
        data.limiteNivel2 = 1;
        data.limiteNivel3 = 1;
        data.limiteNivel4 = 1;
        data.limiteNivel5 = 1;
        return data;
      case "2":
        data.limiteNivel1 = 3;
        data.limiteNivel2 = 3;
        data.limiteNivel3 = 3;
        data.limiteNivel4 = 1;
        data.limiteNivel5 = 1;
        return data;
      case "3":
        data.limiteNivel1 = 6;
        data.limiteNivel2 = 6;
        data.limiteNivel3 = 6;
        data.limiteNivel4 = 1;
        data.limiteNivel5 = 1;
        return data;
      case "4":
        data.limiteNivel1 = 15;
        data.limiteNivel2 = 15;
        data.limiteNivel3 = 15;
        data.limiteNivel4 = 1;
        data.limiteNivel5 = 1;
        return data;
      case "5":
        data.limiteNivel1 = 32;
        data.limiteNivel2 = 32;
        data.limiteNivel3 = 32;
        data.limiteNivel4 = 1;
        data.limiteNivel5 = 1;
        return data;
      case "6":
        // data.limiteNivel1 = 46;
        // data.limiteNivel2 = 46;
        // data.limiteNivel3 = 46;
        // data.limiteNivel4 = 1;
        // data.limiteNivel5 = 1;
        // return data;
        console.log(
          "No es posible ingresar esta distribución. Error: Full requests."
            .bgRed.bold
        );
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
  distribucionDatosCaso2GraphQL,
  distribucionDatosCaso3GraphQL,
  distribucionDatosCaso4GraphQL,
  distribucionDatosCaso5GraphQL,
};
