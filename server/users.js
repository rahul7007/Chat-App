//Helper functions that are going to help us to manage users (signin, signout, removing users etc.)
const users = [] // array to holds all the users 

const addUser = ({id,name, room}) =>{
    name = name.trim().toLowerCase() //JavaScript Mastery = javascriptmastery
    room = room.trim().toLowerCase()

    //Check if same username is exist in a room
    const existingUser = users.find((user)=> user.name === name && user.room === room)
    if(existingUser){
        return ({error:'username already taken'})
    }
    // else
    const user = {id, name, room}
    users.push(user)
    return { user }
}

const removeUser = (id) =>{ // remove users need only id parameter
    //Find the user to be remove first
    const index = users.findIndex((user) => user.id === id)

    if(index != -1){  // remove user
        return users.splice(index, 1)[0]
    }    
}

// see if there is a user
const getUser = (id) => users.find((user) => user.id === id)

//see all the users from the room
const getUsersInRoom = (room) => users.filter((user) => user.room = room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom }