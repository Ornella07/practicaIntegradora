import daoCart from "../daos/dbManager/cart.dao.js";
import { Router } from "express";


const cartRouter = Router();
// const daoCart = new cartDao();


cartRouter.get('/', async(req,res) => {
    try {
        res.send({
            status:200,
            payload: await daoCart.getCarts()
        })        
    } catch (error) {
        res.send({
            status:400,
            payload:error
        });
    }
})

//?Agrega/crea un carrito
cartRouter.post('/', async (req,res) => {
    try {
        res.send({
            status: 200,
            payload: await daoCart.createCart(req.body)
        })
    } catch (error) {
        res.send({
            status:400,
            payload:error
        })
    }
});

//? Actualizacion de un carrito existente tomando como referencia su id.
cartRouter.put('/api/carts/:cid/api/products/:pid', async(req,res)=>{
    const {pid, cid} = req.params;
    try {
        res.send({
            status:200,
            payload: await daoCart.updateCart(pid, cid, req.body)
        })
    } catch (error) {
        res.send({
            status:400,
            payload:error
        })
    }
});

//?Elimina un carrito por ID
cartRouter.delete('/:cid', async(req,res) => {
    const {cid} = req.params;
    try {
        res.send({
            status:200,
            payload: await daoCart.deleteCart(cid, req.body)
        })
    } catch (error) {
        res.send({
            status:400,
            payload:error
        })
    }
})

export default cartRouter;
