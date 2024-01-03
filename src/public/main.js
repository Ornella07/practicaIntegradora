// const container = document.getElementById("cardContainer");


console.log('Mensaje del lado del cliente'); 

document.addEventListener("DOMContentLoaded", () => {

    const messages = document.getElementById('messages');
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const socket = io();

//?Enviar Mensaje mediante Chat
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value.trim();
    console.log('Enviando mensaje:', message);

    if (message !== '') {
        socket.emit('message', message);
        input.value = '';
    }
});

socket.on('message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

// socket.on('message', (msg) => {
//     console.log('Mensaje recibido:',msg)
//     const item = document.createElement('li');
//     item.textContent = msg;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
//     });
});