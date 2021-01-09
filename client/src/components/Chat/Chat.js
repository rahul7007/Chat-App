import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ( {location} ) =>{
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const ENDPOINT = 'localhost:5000'
    useEffect( () =>{
        // const data = queryString.parse(location.search)
        // console.log(location.search) // ?name=nameYouGave&room=roomYouGave
        // console.log(data) // name&room will come in object format

        const {name, room} = queryString.parse(location.search)
        // console.log(name, room) // access name & room from the url

        socket = io(ENDPOINT)
        console.log(socket)
        
        setName(name) // set name
        setRoom(room) // set room
        
        socket.emit('join', {name, room})

        //for handling exception
        // socket.emit('join', {name, room}, ({ error })=>{
        //     alert(error)
        // })
        
    }, [ENDPOINT, location.search]) //rerender only if name/room change
    return(
        <h1>Chat</h1>
    )
}

export default Chat