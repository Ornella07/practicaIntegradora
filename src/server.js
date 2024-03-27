import { configEnv } from "#configs/env.config.js";
import httpServer from "#configs/server/http.config.js";
import socketServer from "#configs/server/socket.config.js";

import tests from "#tests/index.js";

import logger from "#utils/logger.js";

const PORT = configEnv.PORT;

const initializeServer = async () => {
  try {
    socketServer;

    httpServer.listen(PORT, () => {
      logger.info(`[Server] - Server is running on port ${PORT}`);

      if (configEnv.TESTS === true) {
        tests();
      }
    });
  } catch (error) {
    logger.error(error);
  }
};

initializeServer();



// import express from "express";
// import _dirname from "./dirname.js";
// import mongoose from "mongoose";
// import handlebars from "express-handlebars";
// import { Server } from 'socket.io';
// //Routes
// import productRouter from "./routes/product.routes.js";
// import viewsRouter from "./routes/views.routes.js";
// import cartRouter from "./routes/cart.routes.js";
// import messageRouter from "./routes/message.routes.js";
// import { createServer } from 'node:http';

// //Passport imports
// import cookieParser from 'cookie-parser';

// import passport from 'passport';
// import initializePassport from './config/passport.config.js';

// // Imports Routes
// import sessionsRouter from './routes/session.routes.js'
// import usersViewRouter from './routes/users.views.routes.js';
// import githubLoginViewRouter from './routes/github-login.views.router.js'


// const port = 8080;
// const app = express();
// const server = createServer(app);
// const io = new Server(server);


// //JSON settings:
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.engine('handlebars', handlebars.engine());
// app.set('views', _dirname + '/views')
// app.set('view engine', 'handlebars');
// app.use(express.static(_dirname + '/public'));

// //Conectamos nuestra session con el firestore
// // const fireStore = FileStore(session)
// const MONGO_URL = "mongodb+srv://OrneSereno:Sarasa0801@cluster0.fowy4qs.mongodb.net/?retryWrites=true&w=majority" ; 

// //Cookies
// //router.use(cookieParser());
// app.use(cookieParser("CoderS3cr3tC0d3"));

// //Middlewares Passport
// initializePassport();
// app.use(passport.initialize());
// // app.use(passport.session());

// //Declare routers:
// app.use("/", viewsRouter);
// app.use("/users", usersViewRouter);

// // app.use('/api/users', usersRouter);
// app.use("/api/jwt", githubLoginViewRouter);

// app.use("/api/products", productRouter)
// app.use('/messages', messageRouter)
// app.use('/cart', cartRouter);
// app.use("/", viewsRouter);
// // app.use('/users', userViewsRouter);
// app.use('/api/sessions', sessionsRouter)

// //Handlebars
// app.engine('hbs', handlebars.engine(
//     {
//         extname: ".hbs",
//         defaultLayout: "main"
//     }
// ));

// app.set("view engine", "hbs")
// app.set("views", _dirname + "/views");


// const messages = [];

// io.on("connection", (socket) => {
//   console.log("Nuevo usuario conectado");

//   socket.on("messages", (msg) => {
    
//     console.log(msg);
//     messages.push(msg);
//     io.emit("messages", messages);
//   });

//  io.on("inicio", (msg) => {
//     io.emit("messages", messages);
//     socket.broadcast.emit("connected", msg);
//   });

//   socket.emit("messages", messages);
// });

// //Mongoose
// // mongoose.connect('mongodb+srv://OrneSereno:Sarasa0801@cluster0.fowy4qs.mongodb.net/?retryWrites=true&w=majority')
// // .then(() => console.log("Conectado a DB"))
// // .catch((err) => console.log(err))

// //Iniciar
// server.listen(port, () => {
//     console.log(`Se Inicio el servidor ${port}`)
// });


// const connectMongoDB = async () => {
//   try {
//       await mongoose.connect(MONGO_URL);
//       console.log("Conectado con exito a MongoDB usando Moongose.");
//   } catch (error) {
//       console.error("No se pudo conectar a la BD usando Moongose: " + error);
//       process.exit();
//   }
// };
// connectMongoDB();