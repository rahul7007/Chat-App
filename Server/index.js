//Node server which will handle socket conections

const io = require('socket.io')(8000) //port on which socket run

const users = {}

io.on('connection', socket=>{   //listen to all connetions when server starts
    socket.on('new-user-joined', name=>{    //this event will trigger when new user joins and let everyone know who connected to server.
        console.log("New user", name);  
        users[socket.id] = name     //when user joined he will get a socket id
        socket.broadcast.emit('user-joined', name)  // let everyone know who joined to chat
    })

    //if someone sends message, broadcast it to other people
    socket.on('send', message=>{    
        socket.broadcast.emit('receive', {message: message, name:users[socket.id]}) //responsible for all message receive
    })

    //if someone leaves the chat let everyone know
    socket.on('disconnect', message=>{    //built in event
        socket.broadcast.emit('leave', users[socket.id]) //responsible for all message receive
        delete users[socket.id]
    })
})