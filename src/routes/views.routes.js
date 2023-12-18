import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";
import cartDao from "../daos/dbManager/cart.dao.js";

const productoDao = new productDao();
const cartsDao = new cartDao();


  const viewsRouter = Router();//!Muestra la card pero no la info

viewsRouter.get("/", async (req, res) => {
  res.render("index", {
    productos: await productoDao.getAllProducts(),
    fileCss: 'style.css'
    
  });
});

viewsRouter.get("/cart", async (req, res) => {
  const cart = await cartsDao.createProduct();
  res.render("cart", {
   title: "Carrito",
   productos: cart
    
    
  });
});


export default viewsRouter;


// router.get("/", async (req, res) => {
//     const product = await productoDao.getAllProducts();  
//     res.render("index", {
//      product,
     
//     });
//   });
  
//   export default router;