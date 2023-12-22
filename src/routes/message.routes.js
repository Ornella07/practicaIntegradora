import { Router } from "express"; 
import messageDao from "../daos/dbManager/message.dao.js";

const messageRouter = Router();

messageRouter.get('/messages', (req, res) => {
    const messages = messageDao.getAllMessages();
    res.json(messages);
  });
  
  messageRouter.post('/messages', (req, res) => {
    const message = req.body.message;
    messageDao.addMessage(message);
    io.emit('chat message', message); // Emitir el mensaje a todos los clientes conectados
    res.sendStatus(200);
  });
  
//? Mostrar el mesanje por pantalla
messageRouter.get('/messages/:id', async(req, res)=>{
    try {
        const mensaje = await messageDao.obtenerMensaje(req.params.id);

        if(!mensaje){
            return res.status(404).json({error: 'Mensaje no encontrado'})
        }
        messageDao.mostrarMensaje(mensaje)
    } catch (error) {  
        console.error('Error en la ruta para mostrar el mensaje',error);
        res.status(500).json({error:'Error interno al servidor'});

    }
})
export default messageRouter;