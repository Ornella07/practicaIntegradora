import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";
// import daoCart from "../daos/dbManager/cart.dao.js";
import messagesDao from "../daos/dbManager/message.dao.js";
import cookieParser from 'cookie-parser'

const viewsRouter = Router();

const productoDao = new productDao();
// const cartsDao = new CartDao();
const messageDao = new messagesDao();



viewsRouter.get("/", async (req, res) => { //!FUNCIONA
  res.render("index", {
    productos: await productoDao.getAllProducts(),
    fileCss: 'css/style.css'
  });
});

viewsRouter.get("/messages", (req,res)=>{
  res.render("message", {
    title:'Ingreso de mensaje',
    fileCss: 'css/style.css'
  })  
})


//con Firma
viewsRouter.use(cookieParser('Coders3cr3tC0d3'))

viewsRouter.get('/',(req,res) =>{
  res.render('index',{});
});

viewsRouter.get('/setcookie', (req,res) =>{
  //sin firma
  // res.cookie('CooderCookie', 'Esta es una cookie sin firma!!', { maxAge: 30000 }).send('Cookie asignada con exito')

  //Con Firma
  res.cookie('CooderCookie', 'Esta es una cookie sin firma!!', { maxAge: 30000, signed: true }).send('Cookie asignada con exito')
});

viewsRouter.get('/getcookie', (req,res)=>{
  //sin Firma
  //res.send(req.cookie);

  //con Firma
  res.send(req.signedCookies)
});

viewsRouter.get('/deletecookie', (req, res)=>{
  //sin firma
  res.clearCookie('CooderCookie').send('Coockie borrada');
})

viewsRouter.get('/logout', (req, res) =>{
  req.session.destroy(error =>{
    if(error){
      res.json({error: 'Error logout', msg:' error al cerrar la session'})
    }
    res.send('Session cerrada correctamente')
  })
});

viewsRouter.get('/login', (req, res)=>{
  const { username, password } = req.body;
  if(username != 'pepe' || password != '123qwe'){
    return res.status(401).send('Login Failed, check your credentials')
  }else{
    req.session.user = username;
    req.session.admin = false;
    res.send('login successful')
  }
});
// Middleare auth
function auth(req, res, next) {
  if (req.session.user === 'pepe' && req.session.admin) {
      return next()
  } else {
      return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
  }
}


viewsRouter.get('/private', auth, (req, res) => {
  res.send('Si estas viendo esto es porque estas autorizado a este recurso!')
});


export default viewsRouter;