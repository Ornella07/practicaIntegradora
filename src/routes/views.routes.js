// import { Router } from "express";
// import productDao from "../daos/dbManager/product.dao.js";
// import cartDao from "../daos/dbManager/cart.dao.js";

// const productoDao = new productDao();
// const cartsDao = new cartDao();


//   const viewsRouter = Router();//!Muestra la card pero no la info

// viewsRouter.get("/", async (req, res) => {
//   res.render("index", {
//     productos: await productoDao.getAllProducts(),
//     fileCss: 'style.css'
    
//   });
// });
// viewsRouter.get("/cart", async (req, res) => {
//   const cart = await cartsDao.getCart() || await cartsDao.createCart();
//   res.render("cart", {
//    title: "Carrito",
//    productos: cart.products || []
//   });
// });


// export default viewsRouter;

import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";
import CartDao from "../daos/dbManager/cart.dao.js";
import messagesDao from "../daos/dbManager/message.dao.js";


const viewsRouter = Router();
const productoDao = new productDao();
// const cartsDao = new CartDao();
const messageDao = new messagesDao();


viewsRouter.get("/", async (req, res) => {
  res.render("index", {
    productos: await productoDao.getAllProducts(),
    fileCss: 'style.css'
  });
});

viewsRouter.get("/messages", (req,res)=>{
  res.render("message", {ctitle:'Ingreso de mensaje'});
  fileCss: 'style.css';
})




// viewsRouter.get("/cart", async (req, res) => {
//   const cart =  await cartsDao.createCart();
//   res.render("cart", {
//    title: "Carrito",
//    productos: cart.products || []
//   });
// });

export default viewsRouter;