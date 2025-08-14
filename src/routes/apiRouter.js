import express from "express";
import { ApiController } from "../controllers/apiController.js";

class ApiRouter {
    constructor() {
        this.router = express.Router();
        this.apiController = new ApiController();
        this.initRouter();
    }

    initRouter() {
        // ✅ Correção: remover parâmetros desnecessários
        this.router.get('/', this.apiController.getApi.bind(this.apiController));
        this.router.get('/aulas', this.apiController.getAulas.bind(this.apiController));
    }

    getRouter() {
        return this.router;
    }
}

export default ApiRouter;