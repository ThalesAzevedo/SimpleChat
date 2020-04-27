const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/public/index.html')
})


io.on('connection', (socket) => {
    console.log(`new connection -id: ${socket.id}`)
    
    socket.on('chat-message', (message)=> {
        console.log(`${message.name} disse: ${message.message}`)
        io.emit('chat-message', message)
        console.log('Distribuindo Mensagem')
    })

    socket.on('disconnect', (socket)=> {
        console.log(`Socket disconnected.`)
        io.emit('chat-message', {
            name: ' ',
            message: `Alguém saiu da conversa.`})
    })

    
})

http.listen(3000, () => {
    console.log('Server on - localost:3000')
})

