
var cart = cart
const logoutButton = document.getElementById("logout")
const finishPurchase = document.getElementById("finish")
async function addItem(index){

    let data = await  fetch('/api/products')
    let productos = await data.json()
    console.log(productos.docs[index])
    let cargar = await fetch(`/api/carts/${cart}/product/${productos.docs[index]._id}`,{method:"POST"})
}




logoutButton.addEventListener('click',e =>{
    
    fetch('/api/sessions/logout',{
        method:"GET",
        headers:{
           'Content-Type': 'application/json'
        }
    }).then(result =>{
        
        if(result.status === 200) window.location.replace('/users/login')})
})

finishPurchase.addEventListener('click',e=>{
    window.location.replace(`/api/carts/${cart}/purchase`)

})

// console.log('Mensaje del lado del cliente'); 

// document.addEventListener("DOMContentLoaded", () => {

//     const messages = document.getElementById('messages');
//     const form = document.getElementById('form');
//     const input = document.getElementById('input');
//     const socket = io();

// //?Enviar Mensaje mediante Chat
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const message = input.value.trim();
//     console.log('Enviando mensaje:', message);

//     if (message !== '') {
//         socket.emit('message', message);
//         input.value = '';
//     }
// });

// socket.on('message', (msg) => {
//     const item = document.createElement('li');
//     item.textContent = msg;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
// });




// const logoutButton = document.getElementById("logout")


// logoutButton.addEventListener('click', e =>{
    
    

//     fetch('/api/sessions/logout',{
//         method:"GET",
//         headers:{
//            'Content-Type': 'application/json'
//         }
//     }).then(result =>{
        
//         if(result.status === 200) window.location.replace('/users/login')})
// })

// });