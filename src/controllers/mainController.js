import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { jsonReader } from "../helpers/helpers.js";
dotenv.config();

const PATH_2_VIEWS = process.env.VIEWS_DIRECTORY || path.resolve("views")
const PATH_2_JSON = process.env.JSON_DIRECTORY||"DATA/JSON"
const JSON_PAGES = path.resolve(PATH_2_JSON, 'pages.json');

export class MainController {
    async getMain(req, res) {
        try {
           const pages = JSON.parse(fs.readFileSync(JSON_PAGES, 'utf-8'));
            res.render("pages/landing", { page: pages.find(page => page.id === "landing") });
        } catch (error) {
            throw new Error(`Error in MainController.getMain: ${error.message}`);
        }
    }

    async getAbout(req, res) {
        try {
            const pages = JSON.parse(fs.readFileSync(JSON_PAGES, 'utf-8'));
            res.render("pages/about", { page: pages.find(page => page.id === "about") });
        } catch (error) {
            throw new Error(`Error in MainController.getMain: ${error.message}`);
        }
    }

    async getHome(req, res) {
        try {
           const pages = await jsonReader("pages");
           
            res.render("pages/home", { page: pages.find(page => page.id === "home") });
        } catch (error) {
            throw new Error(`Error in MainController.getMain: ${error.message}`);
        }
    }
}