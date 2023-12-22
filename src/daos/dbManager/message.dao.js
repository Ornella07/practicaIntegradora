import { messageModel } from "../../models/message.model.js";

class messageDao{
    constructor(){
        this.messages = [];
    }
    obtenerMensaje(){
        return this.messages;
    }
    agregarMensaje(){
        this.messages.push(message);
    }
}

export default messageDao;