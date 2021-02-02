const socket = io('http://localhost:8000');

//Get DOM elements in a respective JS variables
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')
//Audio that will play on receiving messages
var audio = new Audio("tone.mp3")

//Function which will append to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
    if(position == 'left'){
        audio.play()
    }
}

// Ask new user for his/her name and let the server know
const Name = prompt("Enter your name: ");
socket.emit("new-user-joined", Name);

//if new users joins, receive his name from the server
socket.on('user-joined', data=>{
    append(`${data} joined the chat`, 'right')
})

//if server sends a message, receive the message
socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left') //why data.name ?? see 'receive' event, it is sending name & msg
})

//if a user leave the chat, append the info to the container
socket.on('leave', name=>{
    append(`${name} left the chat`, 'left')
})

//if the form gets submitted, send server the message
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const message = messageInput.value
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageInput.value = ''
})