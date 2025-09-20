require('dotenv').config();
const express = require('express');
const https = require('https');
const CORS = require('cors');
const { Server } = require("socket.io");
const fs = require('fs');
const { LL, ViewsDir, CdnDir} = require('./tools');

//Routers
const { apiRouter } = require('./routers/apiRouter')

//6090 = prod
//6080 = beta
//6091 = misc
const appPort = process.env.PORT || 3030;
const app = express();
const server = https.createServer(
    {
        key: fs.readFileSync(__dirname + '/cert/key.pem'),
        cert: fs.readFileSync(__dirname + '/cert/cert.pem'),
    },
    app
);

app.use(CORS(server));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/cdn', express.static(__dirname + '/cdn/web'));

//Routes
app.use('/api', apiRouter);

const io = new Server(server);

io.sockets.on('connection', socket => {
    socket.on('message', (data) => {
        if (data.Message.message.length > 2)
            io.emit('message', data);
    })
})

app.get('/', (req, res) => {
    res.sendFile(ViewsDir + "index.html");
})

app.get('/messages', (req, res) => {
    res.sendFile(ViewsDir + "messages.html");
})

app.get('/signup', (req, res) => {
    res.sendFile(ViewsDir + "signup.html");
})

app.get('/favicon.ico', (req, res) => {
    res.sendFile(CdnDir + "/web/img/meshGradient.png");
})

server.listen(appPort, () => {
    console.log(LL);
    console.log("The Guitar Connection");
    console.log(LL);
    console.log("https://localhost:" + appPort);
    console.log(LL);
})

module.exports = { io };