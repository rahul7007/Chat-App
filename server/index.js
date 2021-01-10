const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//socket code
io.on('connection', (socket) => {           // connection event
    console.log("We have a new connection !!!");

    socket.on('join', ({name, room}) => {   // user join event with name & room
        console.log(name, room);
    })

    //for handling exception
    // socket.on('join', ({name, room}, callback) => {
    //     console.log(name, room);
    //     const error = true
    //     if(error){
    //         callback({error: 'something wrong'})
    //     }
    // })

    socket.on('disconnecting', () =>{
        console.log("User had left !!");
    })
})

app.use(router)

server.listen(PORT, () => console.log(`server is running at port ${PORT}`))