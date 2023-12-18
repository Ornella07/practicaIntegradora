import { cartModel } from "../../models/cart.model.js";

class cartDao {
    constructor() { this.model = cartModel }

    async getAllProducts(){
        return await this.model.find().lean();
    }
    async getCartById(id){
        return await this.model.findById(id);
    }
    async createCart(product){
        return await this.model.create(product);
    }
    async updateProduct(id, product){
        return await this.model.findByIdAndUpdate(id, product);
    }
    async deleteProduct(id){
        return await this.model.findByIdAndDelete(id);
    }
}
export default cartDao;