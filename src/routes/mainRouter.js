import express from "express";
import { MainController } from "../controllers/mainController.js";
import AulasRouter from "./aulasRouter.js";
import ApiRouter from "./apiRouter.js";
import StorageRouter from "./storageRouter.js";
import itemsRouter from "./itemsRouter.js";

class MainRouter {
    constructor() {
        this.router = express.Router();
        this.mainController = new MainController();
        this.storageRouter = new StorageRouter();
        this.aulasRouter = new AulasRouter();
        this.apiRouter = new ApiRouter();
        this.initRouter();
    }

    initRouter() {
        // Rota principal
        this.router.get("/", this.mainController.getMain.bind(this.mainController));
        this.router.get("/about", this.mainController.getAbout.bind(this.mainController));
        this.router.get("/home", this.mainController.getHome.bind(this.mainController));
        // Sub-routers - CORREÇÃO AQUI
        this.router.use("/storage", this.storageRouter.getRouter());
        this.router.use("/aulas", this.aulasRouter.getRouter());
        this.router.use("/api", this.apiRouter.getRouter());
             this.router.use("/items", itemsRouter);
    }

    getRouter() {
        return this.router;
    }
}

export default MainRouter;