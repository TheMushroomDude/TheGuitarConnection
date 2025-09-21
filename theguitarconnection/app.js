require('dotenv').config();
const express = require('express');
const https = require('https');
const CORS = require('cors');
const fs = require('fs');
const { LL, ViewsDir, CdnDir, FormatSocketInfo} = require('./tools');

//Routers
const { apiRouter } = require('./routers/apiRouter');
const { apiWSRouter } = require('./routers/apiWebsocketRouter');
const {Server} = require("socket.io");

//6090 = prod
//6080 = beta
//6091 = misc
const appPort = process.env.PORT || 3030;
const app = express();
const serverApp = https.createServer(
    {
        key: fs.readFileSync(__dirname + '/cert/key.pem'),
        cert: fs.readFileSync(__dirname + '/cert/cert.pem'),
    },
    app
);

app.use(CORS(serverApp));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/cdn', express.static(__dirname + '/cdn/web'));

//Routes
app.use('/api', apiRouter);
app.use('/api/ws', apiWSRouter);

const io = new Server(serverApp);
let ConnectedClients = [];

io.sockets.on('connection', socket => {

    socket.on('message', (data) => {
        if(data.type === null || undefined) return;

        switch (data.type) {
            case 'userMessage':
                if (data.Message.message.length > 2){
                    io.emit('usermessage', data);
                }
                break;

            case 'profileInfo':
                socket.profileInfo = data.UserProfile;
                ConnectedClients.push({"socketId": socket.id, "profileInfo": socket.profileInfo});
                io.emit('info',
                    FormatSocketInfo("connectedClients", {
                    "clientCount": io.engine.clientsCount,
                    "clients": ConnectedClients
                }));
                break;
        }
    })

    socket.on('disconnect', () => {
        let FindClient = ConnectedClients.find((client) => client.socketId === socket.id);
        ConnectedClients.splice(ConnectedClients.indexOf(FindClient), 1);

        io.emit('info',
            FormatSocketInfo("connectedClients", {
            "clientCount": io.engine.clientsCount,
            "clients": ConnectedClients
        }));
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

app.get('/robots.txt', (req, res) => {
    res.sendFile(CdnDir + "/storage/robots.txt");
})

app.get('/favicon.ico', (req, res) => {
    res.sendFile(CdnDir + "/web/img/meshGradient.png");
})

serverApp.listen(appPort, () => {
    console.log(LL);
    console.log("The Guitar Connection");
    console.log(LL);
    console.log("https://localhost:" + appPort);
    console.log(LL);
})