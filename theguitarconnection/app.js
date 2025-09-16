const express = require('express');
const https = require('https');
const Websocket = require('ws');
require('dotenv').config();
const fs = require('fs');
const { LL, ViewsDir, CdnDir} = require('./tools');

//Routers
const { apiRouter } = require('./routers/apiRouter')
const { apiRouterMessages } = require('./routers/apiMessagesRouter')

const appPort = process.env.PORT || 3030;
const app = express();
const server = https.createServer(
    {
        key: fs.readFileSync(__dirname + '/cert/key.pem'),
        cert: fs.readFileSync(__dirname + '/cert/cert.pem'),
    },
    app
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/cdn', express.static(__dirname + '/cdn/web'));

//Routes
app.use('/api', apiRouter);
app.use('/api/messages', apiRouterMessages);

const wss = new Websocket.Server({server: server});

wss.on('connection', (data) => {
    console.log("Connection Made...");
});

wss.on('message', (data) => {
    console.log(data);
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