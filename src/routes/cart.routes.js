// import { Router } from "express";
// import cartDao from "../daos/dbManager/cart.dao.js";

// const cartsDao = new cartDao();

// const cartRouter = Router();



// //! Creamos un nuevo carrito.
// cartRouter.post('/', async (req, res) => {
//   try {
//      // Generar un código único para el carrito
//      const cartCode = generateUniqueCartCode(); // Implementa esta función según tus necesidades
//     const newCart = await cartsDao.createCart({code: cartCode, products:[]});
//     console.log(`Nuevo Carrito creado, ${newCart}`)
//     res.json({ cart: newCart });
//   } catch (error) {
//     console.error('Error al crear el carrito', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// });

// //! Obtenemos productos en un carrito por ID
// cartRouter.get('/:cartId', async(req, res) => {
//     try { 
//         const cartId = req.params.cartId;
//         const cart = await cartsDao.getCartById(cartId);

//         // Verifica si el carrito existe
//         if (!cart) {
//             res.status(404).json({ error: 'Carrito no encontrado.' });
//             return;
//         };

//         console.log('Productos en el carrito:', cart.products);
//         res.render('cart', { products: cart.products });
//     } catch (error) {
//         console.error('Error al procesar la solicitud:', error);
//         res.status(500).json({ error: 'Error interno del servidor.' });
//     };
// });


// export default cartRouter;




import { Router } from "express";
import CartDao from "../daos/dbManager/cart.dao.js";

const cartRouter = Router();
const cartDao = new CartDao();

cartRouter.post('/addToCart', async (req, res) => {
    try {
        const productData = req.body; // Asume que el cuerpo de la solicitud contiene los datos del producto
      const nuevoCarrito = await cartDao.createCart('unCodigoUnico');


        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: 'No se pudo agregar el producto al carrito.' });
    }
});

export default cartRouter;
