    //create a new connection
    const express = require('express');
    const app = express(); 
    const path = require('path');
    
    const db = require("../../methods/dbConnection");
    // const port = process.env.PORT || 3000;
    const http = require('http').Server(app);
    
    //attach http server to the socket.io
    const io = require('socket.io')(http);

const socketConnection = (req, res)=>{


io.on('connection', (socket) => {
    console.log("A user connected")
    let person_id = req.session.personid;
    let query = `select * from cart where personid=${person_id}`
    
    db(query).then(function(data){
    
        for(let i=0;i<data.length;i++) console.log(data[i])
    })

    socket.on('disconnect', () => {
        console.log("A user disconnected")
    })

    //receiving message from client
    socket.on('message', msg => {
        console.log("client message :" + msg)
    })

    //sending message to client
    socket.emit('server', "this is the messsage from server");
})

// http.listen(port, () => {
//     console.log(`App listening on port ${port}`);
// })
}

module.exports = { socketConnection }