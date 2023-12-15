import { Schema, model } from "mongoose";

const productSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
});

const productModel = model("products", productSchema);

export { productModel };