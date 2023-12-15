import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";

const productosDao = new productDao()

const viewsRouter = Router()

viewsRouter.get("/", async (req, res) => {
    res.render("index", {
        productos: productos
    });

})

export default viewsRouter