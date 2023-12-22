import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";
// import { productModel } from "../models/product.model.js";

const productosDao = new productDao();

const productRouter = Router();

productRouter.get("/", async (req, res) => { 
    try {
        res.send({
        status: 200,
        payload: await productosDao.getAllProducts()
    })}
    catch(err) {
        res.send({
            status: 400,
            payload: err
        })
    }
})

productRouter.post("/", async (req, res) => { //! FUNCIONA... YA NO
    try {
        res.send({
            status: 200,
            payload: await productosDao.createProduct(req.body)
    })}
    catch(err) {
        res.send({
            status: 400,
            payload: "No se pudo agregar"
        })
    }
})

productRouter.delete("/:id", async(req, res)=>{ //! FUNCIONA
    try{
        const productId = req.params.id;
        const result = await productosDao.deleteProduct(productId);
        res.send({
            status:200,
            playload: result
        })
    }catch(err){
        res.send({
            status: 400,
            payload: err
        })
    }
})
export default productRouter





