import navEngine from "./engines/navEngine.js";
import valuesEngine from './engines/valuesEngine.js'
const main = async () => {
    await navEngine();
    await valuesEngine();

};

main();