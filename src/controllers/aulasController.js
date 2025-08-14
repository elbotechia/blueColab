import { handleHttpError } from "../errors/handleError.js";
import path from "path";
import { Aula } from "../models/schemas/aula.js";
export class AulasController {
    constructor() {
    }

    async getMain(req, res) {  // ✅ Adicionado parâmetro 'req'
        try {
            // ✅ Caminho correto relativo ao diretório do projeto
            res.sendFile("aulas.html", { root: path.resolve("public/AULAS") });
        } catch (error) {
            handleHttpError(res, "ERROR_AULAS_GET_MAIN", error);           
        }
    }

    async getAula(req, res) {  // ✅ Adicionado parâmetro 'req'
        try {
            // ✅ Caminho correto relativo ao diretório do projeto
            res.sendFile("aula.html", { root: path.resolve("public/AULAS") });
        } catch (error) {
            handleHttpError(res, "ERROR_AULAS_GET_MAIN", error);           
        }
    }

}