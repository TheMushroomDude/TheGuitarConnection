const WebsocketLogColor = "color: #75aaff";
const connectWsBtn = document.getElementById('connectWsBtn');
const sendMessageBtn = document.getElementById('sendMessageBtn');

window.onload = () => ConnectToWebsocket();

connectWsBtn.onclick = () => ConnectToWebsocket();

sendMessageBtn.onclick = () => SendMessage();

function ConnectToWebsocket(){
    const socket = new WebSocket("ws://" + window.location.origin.split('/')[2]);
    globalThis.socket = socket;

    socket.addEventListener("open", () => {
        console.log("%c Connected to the websocket! :)", WebsocketLogColor);
    })

    socket.addEventListener("close", () => {
        console.log("%c Disconnected from the websocket! :(", WebsocketLogColor);
    })

    socket.addEventListener("message", (data) => {
        console.log(data);
    })
}

function SendMessage(){
    const DateTime = new Date();

    if(socket.readyState === 1) {
        const jsonFormat = {
            "username": "username1234",
            "usernameColor": "",
            "timestamp": DateTime.toTimeString(),
            "message": "placeholder message!",
        }

        socket.send(JSON.stringify(jsonFormat));
    }
    else
        console.log("%c Can't send message, socket isn't connected yet lol", WebsocketLogColor);
}