const DateTime = new Date();
const WebsocketLogColor = "color: #75aaff";

document.addEventListener("DOMContentLoaded", () => {
    ConnectToWebsocket();
})

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
    console.log(socket.readyState)
    if(socket.readyState === 1) {
        socket.send(JSON.stringify({
            "username": "username1234",
            "usernameColor": "",
            "timestamp": DateTime.toTimeString(),
            "message": "placeholder message!",
        }))
    }
    else{
        console.log("%c Can't send message, socket isn't connected yet lol", WebsocketLogColor);
    }
}