const WarnStyle = "color: lightblue;";
const SillyStyle = "color: lightblue; background-color: purple; padding: 12px; text-align: center; border-radius: 0px 0px 10px 10px;";
const SillyStyle2 = "color: lightblue; background-color: purple; padding: 12px; text-align: center; border-radius: 10px 10px 0px 0px; font-size: 20px;";

const AccountName = document.getElementById("AccountName");
const AccountPfp = document.getElementById("AccountPfp");

const SignUpBtn = document.getElementById("SignUpBtn");
const SignUpBtnLink = document.getElementById("SignUpBtnLink");

window.onload = () => AccountExists();

console.log("%c              The Useless Feature.                     ", SillyStyle2)
console.log("%c What if I spent time to do something nobody will notice, just for a log message which provides literally no useful info! 🙀", SillyStyle)

function AccountExists(){
    const UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    const CachedLogin = JSON.parse(localStorage.getItem('CachedLogin'));

    if(UserProfile === null || CachedLogin === null) return console.log("%c There's no accounts 🙀", WarnStyle);
    AccountName.innerHTML = UserProfile[CachedLogin].username;
    AccountPfp.src = `/cdn/img/profilePictures/${UserProfile[CachedLogin].profilePicture}.png`;
    ReplaceSignUpInfo();
}

function ReplaceSignUpInfo(){
    SignUpBtnLink.href = `/messages`;
    SignUpBtn.innerHTML = "Start chatting!";
}