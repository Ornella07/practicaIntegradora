import { Schema, model, mongoose } from "mongoose";

const cartSchema = new Schema({
  code: { type: String, required: false }, 
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, require: true, default: 1 }
  }]
});
  
  const cartModel = mongoose.model("cart", cartSchema);
  
  export { cartModel };