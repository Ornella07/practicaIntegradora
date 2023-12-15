
import express from "express";
import _dirname from "./dirname.js";

import mongoose from "mongoose";
import handlebars from "express-handlebars";

//Routes
import productRouter from "./routes/product.routes.js";
import viewsRouter from "./routes/views.routes.js";

const port = 5000;
const app = express();

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))
app.use('/static', express.static('public'))
app.use(express.static(_dirname + 'public'))

//Rutas
app.use("/api/products", productRouter)
app.use("/", viewsRouter)

//Handlebars
app.engine('hbs', handlebars.engine(
    {
        extname: ".hbs",
        defaultLayout: "main"
    }
))
app.set("view engine", "hbs")
app.set("views", _dirname + "/views")


//Mongoose
mongoose.connect('mongodb+srv://OrneSereno:@cluster0.fowy4qs.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log("Conectado a DB"))
.catch((err) => console.log(err))

//Iniciar
app.listen(port, () => {
    console.log(`Se Inicio el servidor ${port}`)
})