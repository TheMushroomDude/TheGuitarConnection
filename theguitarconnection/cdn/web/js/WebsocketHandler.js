import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

const WebsocketLogColor = "color: #75aaff";
let CurrentChatHistory = [];

const ChatContainer = document.getElementById("ChatContainer");
const ChatMessageTemplate = document.getElementById("ChatMessageTemplate");

const MessageSendBtn = document.getElementById('MessageSendBtn');
const MessageInput = document.getElementById('MessageInput');

const SideInfoConnectedClientsCount = document.getElementById("SideInfoConnectedClientsCount");
const SideInfoConnectedClientsList = document.getElementById("SideInfoConnectedClientsList");

const toggleChatHTML = document.getElementById("toggleChatHTML");
const toggleFollowChat = document.getElementById("toggleFollowChat");

CurrentProfile();

MessageSendBtn.onclick = () => SendMessage();
MessageInput.onkeyup = (event) => {
    if(event.key === "Enter")
        SendMessage();
}

function CurrentProfile(){
    const UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    const CachedLogin = JSON.parse(localStorage.getItem('CachedLogin'));

    if(UserProfile === null || CachedLogin === null){
        console.warn("%c Can't find a profile!", WebsocketLogColor);

        CreateSystemMessage(
            `You don't have an account... please sign up at <a href="/signup">${window.location.host}/signup</a> !`
        );
        return;
    }

    globalThis.UserProfile = UserProfile[CachedLogin];
    ConnectToWebsocket();
}

function ConnectToWebsocket(){
    const socket = io("wss://" + window.location.host);
    globalThis.socket = socket;

    socket.addEventListener("connect", () => {
        console.log("%c Connected to the websocket! :)", WebsocketLogColor);
        console.log(socket);
        socket.send({"type": "profileInfo", UserProfile});

        MessageSendBtn.disabled = false;
        MessageInput.disabled = false;
    })

    socket.addEventListener("disconnect", () => {
        console.log("%c Disconnected from the websocket! :(", WebsocketLogColor);
    })

    socket.addEventListener("usermessage", (data) => {
        console.log(data);
        CreateMessageUi(data);
        CurrentChatHistory.push({"UserInfo": data.UserInfo, "Message": data.Message});
    })

    socket.addEventListener("info", (data) => {
        console.log(data);

        switch(data.type) {
            case "connectedClients":
                ConnectedClientsList(data.info); break;

            default: break;
        }
    })
}

function SendMessage(){
    const DateTime = new Date();

    const jsonFormat = {
        "type": "userMessage",
        "SocketId": socket.id,
        "UserInfo": {
            "username": UserProfile.username,
            "profilePicture": UserProfile.profilePicture,
            "usernameColor": "",
        },
        "Message": {
            "timestamp": DateTime.toJSON(),
            "message": MessageInput.value,
        }
    }

    console.log("%c Sending message...", WebsocketLogColor);
    socket.send(jsonFormat);
    MessageInput.value = "";
}

function ConnectedClientsList(jsonInfo){
    let ClientsList = [];

    jsonInfo.clients.forEach((item) => {
        console.log(item)
        ClientsList.push(`<img width="20" src="/cdn/img/profilePictures/${item.profileInfo.profilePicture}.png"> ${item.profileInfo.username} <br>`);
    });

    SideInfoConnectedClientsList.innerHTML = ClientsList;
    SideInfoConnectedClientsCount.innerHTML = `People: [${jsonInfo.clientCount}]`;
}

function CreateMessageUi(jsonInfo){
    const NewChatMessageTemplate = ChatMessageTemplate.content.cloneNode(true);

    const ChatMessagePfp = NewChatMessageTemplate.getElementById("chatMessagePfp");
    const ChatMessageUsername = NewChatMessageTemplate.getElementById("chatMessageUsername");
    const ChatMessageInfo = NewChatMessageTemplate.getElementById("chatMessageInfo");

    ChatMessagePfp.src = `/cdn/img/profilePictures/${jsonInfo.UserInfo.profilePicture}.png`
    ChatMessageUsername.innerHTML = jsonInfo.UserInfo.username;

    if(toggleChatHTML.checked)
        ChatMessageInfo.innerHTML = jsonInfo.Message.message;
    else
        ChatMessageInfo.textContent = jsonInfo.Message.message;

    ChatContainer.appendChild(NewChatMessageTemplate);
    SetScrollView();
}

function CreateSystemMessage(message){
    const jsonFormat = {
        "UserInfo": {
            "username": "[SYSTEM]",
            "profilePicture": "EvilRed",
            "usernameColor": "",
        },
        "Message": {
            "timestamp": null,
            "message": message,
        }
    }
    CreateMessageUi(jsonFormat);
}

function SetScrollView(){
    if(toggleFollowChat.checked)
        ChatContainer.scrollTop = 99999999999;
}