import express from "express";
import { AulasController } from "./../controllers/aulasController.js";

class AulasRouter {
    constructor() {
        this.router = express.Router();
        this.aulasController = new AulasController();
        this.initRouter();
    }

    initRouter() {
        // ✅ Correção: remover parâmetros desnecessários
        this.router.get('/', this.aulasController.getMain.bind(this.aulasController));
        this.router.get('/:id', this.aulasController.getAula.bind(this.aulasController));

    }

    getRouter() {
        return this.router;
    }
}

export default AulasRouter;