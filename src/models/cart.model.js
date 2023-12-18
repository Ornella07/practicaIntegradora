import { Schema, model, mongoose } from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [{
    product:{type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type: Number, require:true, default:1 }
  }]
});

const cartModel = model("cart", cartSchema);

export { cartModel };