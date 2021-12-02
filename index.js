const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
	// res.json({message: 'hello world'})
	res.sendFile( path.join(__dirname, 'index.html'))
})

io.on('connection', socket => {
	console.log(`a user connected`)
	socket.on('disconnect', ()=>{
		console.log(`user disconnected`)
	})
	socket.on('chat message', msg=>{
		console.log(`message: ${msg}`)
		io.emit('chat message', msg)
	})
})

const port = 3000
server.listen(port, ()=>{
	console.log(`listening on ${port}`)
})
