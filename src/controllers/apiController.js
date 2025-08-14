import { handleHttpError } from "../errors/handleError.js";
import path from "path";
import { Aula } from "../models/schemas/aula.js";
export class ApiController {
    constructor() {
    }

    async getApi(req, res) {  // ✅ Adicionado parâmetro 'req'
        try {
            // ✅ Caminho correto relativo ao diretório do projeto
            res.send({data: "API AULAS"});
        } catch (error) {
            handleHttpError(res, "ERROR_API_GET_API", error);           
        }
    }

    async getAulas(req, res){
        try {

            const searchByTitle = req.query.title;
            const searchByLang = req.query.lang;

            
            if(!searchByLang && !searchByTitle) {

            const aulas = await Aula.find({});
     
            if(aulas.length >= 0){
                res.status(200).json(aulas);
            }else{
                res.status(404).json({ message: "404: NOT FOUND AULAS" });
            }
        }else if(searchByLang || searchByTitle) {
            const aulas = await Aula.find({
                ...(searchByTitle && { title: { $regex: searchByTitle, $options: "i" } }),
                ...(searchByLang && { lang: { $regex: searchByLang, $options: "i" } })
            });
            if(aulas.length > 0){
                res.status(200).json(aulas);
            }else{
                res.status(404).json({ message: "404: NOT FOUND AULAS" });
            }
        }else{
            const aulas = await Aula.find({});
            if(aulas.length > 0){
                res.status(200).json(aulas);
            }else{
                res.status(404).json({ message: "404: NOT FOUND AULAS" });
            }
        }
        } catch (error) {
            handleHttpError(res, "ERROR_API_GET_AULAS", error);
        }
    }

    async getAulaById(req, res){
        try {
            const { id } = req.params;
            const aula = await Aula.findById(id);

            if(aula){
                res.status(200).json(aula);
            }else{
                res.status(404).json({ message: "404: NOT FOUND AULA" });
            }
        } catch (error) {
            handleHttpError(res, "ERROR_API_GET_AULA_BY_ID", error);
        }
    }
}