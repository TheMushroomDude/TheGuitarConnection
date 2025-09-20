import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

const WebsocketLogColor = "color: #75aaff";

const ChatContainer = document.getElementById("ChatContainer");
const ChatMessageTemplate = document.getElementById("ChatMessageTemplate");

const MessageSendBtn = document.getElementById('MessageSendBtn');
const MessageInput = document.getElementById('MessageInput');

CurrentProfile();
ConnectToWebsocket();

MessageSendBtn.onclick = () => SendMessage();
MessageInput.onkeyup = (event) => {
    if(event.key === "Enter")
        SendMessage();
}

function CurrentProfile(){
    const UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    const CachedLogin = JSON.parse(localStorage.getItem('CachedLogin'));

    if(UserProfile === null || CachedLogin === null) return console.warn("%c Can't find a profile!", WebsocketLogColor);
    globalThis.UserProfile = UserProfile[CachedLogin];
}

function ConnectToWebsocket(){
    const socket = io("wss://" + window.location.host);
    globalThis.socket = socket;

    socket.addEventListener("connect", () => {
        console.log("%c Connected to the websocket! :)", WebsocketLogColor);
    })

    socket.addEventListener("disconnect", () => {
        console.log("%c Disconnected from the websocket! :(", WebsocketLogColor);
    })

    socket.addEventListener("message", (data) => {
        console.log(data);
        CreateMessageUi(data);
    })
}

function SendMessage(){
    const DateTime = new Date();

    const jsonFormat = {
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
}

function CreateMessageUi(jsonInfo){
    const NewChatMessageTemplate = ChatMessageTemplate.content.cloneNode(true);

    const ChatMessagePfp = NewChatMessageTemplate.getElementById("chatMessagePfp");
    const ChatMessageUsername = NewChatMessageTemplate.getElementById("chatMessageUsername");
    const ChatMessageInfo = NewChatMessageTemplate.getElementById("chatMessageInfo");

    ChatMessagePfp.src = `/cdn/img/profilePictures/${jsonInfo.UserInfo.profilePicture}.png`
    ChatMessageUsername.innerHTML = jsonInfo.UserInfo.username;
    ChatMessageInfo.innerHTML = jsonInfo.Message.message;

    ChatContainer.appendChild(NewChatMessageTemplate);
    SetScrollView();
}

function SetScrollView(){
    ChatContainer.scrollTop = 99999999999;
}