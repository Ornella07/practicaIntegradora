import { cartModel } from "../../models/cart.model.js";

class cartDao {
    constructor() { this.model = cartModel }
    //!obtengo todos los productos
    async getCarts(){
        return await this.model.find().lean();
    }
    //!Creo un carrito
    async getCreateCart(cart){
        return await this.model.create(cart);
    }
    //!Obtengo un carrtio especifico
    async getCartById(id){
        return await this.model.findById(id);
    }
    //! Actualizo un carrito existente, tomando su ID...
    async updateCart(id, cart){
        return await this.model.findByIdAndUpdate(id, cart);
    }
    //!Elimino un carrito por ID
    async deleteCart(id){
        return await this.model.findByIdAndDelete(id);
    }
}

const daoCart = new cartDao();

export default daoCart;