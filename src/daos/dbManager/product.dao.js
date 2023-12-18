import { productModel } from "../../models/product.model.js";

class productDao {
    constructor() { this.model = productModel } 

    async getAllProducts(){
        return await this.model.find().lean();
    }
    async getProductById(id){
        return await this.model.findById(id);
    }
    async createProduct(product){
        return await this.model.create(product);
    }
    async updateProduct(id, product){
        return await this.model.findByIdAndUpdate(id, product);
    }
    async deleteProduct(id){
        return await this.model.findByIdAndDelete(id);
    }
}

export default productDao;











// import { productModel } from "../../models/product.model.js"

// class productDao {
//     constructor() { this.model = productModel }

//     async getAllProducts() {
//         console.log('Consiguiendo productos');
//         //Handlebars NO FUNCIONA con los objetos de mongoose
//         //Poner .lean() es para que esté en un formato que sí los pueda usar
//         return await this.model.find().lean()
       
//     }

//     async getProductById(id) {
//         return await this.model.findById(id)
//     }

//     async createProduct(product) {
//         return await this.model.create(product)
//     }

//     async updateProduct(id, product) {
//         return await this.model.findByIdAndUpdate(id, product)
//     }

//     async deleteProduct(id) {
//         return await this.model.findByIdAndDelete(id)
//     }
// }

// export default productDao