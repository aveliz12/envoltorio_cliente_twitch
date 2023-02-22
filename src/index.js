import { casoPrueba } from "../Services/Rest/indexRest.js";
import { casoPruebaCache } from "../Services/Cache/indexCache.js";
import { inquirerMenuCache } from "../Services/Menu/inquirerMenuCache.js";

const twtich = async () => {
  let opt = "";

  do {
    opt = await inquirerMenuCache();

    if (opt === "1") {
      await casoPruebaCache();
    } else {
      await casoPrueba();
    }
  } while (opt !== "0");
};

twtich();
