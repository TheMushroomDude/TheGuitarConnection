const express = require('express');
const http = require('http');
const Websocket = require('ws');
require('dotenv').config();
const { LL, ViewsDir, CdnDir} = require('./tools');

//Routers
const { apiRouter } = require('./routers/apiRouter')

const appPort = process.env.PORT || 3030;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/cdn', express.static(__dirname + '/cdn/web'));

//Routes
app.use('/api', apiRouter);

const wss = new Websocket.Server({server: server});
    wss.on('connection', (socket) => {
        console.log("Connection Made...");
        console.log(socket);
    })


app.get('/', (req, res) => {
    res.sendFile(ViewsDir + "index.html");
})

app.get('/messages', (req, res) => {
    res.sendFile(ViewsDir + "messages.html");
})

app.get('/favicon.ico', (req, res) => {
    res.sendFile(CdnDir + "/web/img/meshGradient.png");
})

server.listen(appPort, () => {
    console.log(LL);
    console.log("The Guitar Connection");
    console.log(LL);
    console.log("http://localhost:" + appPort);
    console.log(LL);
})