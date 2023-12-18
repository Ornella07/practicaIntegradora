import { Router } from "express";
import cartDao from "../daos/dbManager/cart.dao.js";

const cartsDao = new cartDao();

const cartRouter = Router();


//! Creamos un nuevo carrito.
cartRouter.post('/', async (req, res) => {
    try{
        const newCart = await cartsDao.createCart(req.body);
        console.log(`Nuevo carrito creado, ${newCart}`);
        res.json({cart: newCart})
    }
    catch(error){
        console.log('Error al procesar la solicitud', error);
        res.status(500).json({error: 'Error interno del servidor.'});
    }
});

//! Obtenemos productos en un carrito por ID
cartRouter.get('/:id', async(req, res) => {
    try { 
        const cartId = parseInt(req.params.cid);
        const cart = await cartsDao.getCartById(cartId);

        // Verifica si el carrito existe
        if (!cart) {
            res.status(404).json({ error: 'Carrito no encontrado.' });
            return;
        };

        console.log('Productos en el carrito:', cart.products);
        res.json({ products: cart.products });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    };
});


export default cartRouter;
