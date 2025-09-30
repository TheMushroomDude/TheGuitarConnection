const WarnStyle = "color: lightblue;";
const SideInfoPfp = document.getElementById('SideInfoPfp');
const SideInfoUsername = document.getElementById('SideInfoUsername');

SetSideInfoUserContent();

function SetSideInfoUserContent(){
    const UserProfile = JSON.parse(localStorage.getItem('UserProfile'));
    const CachedLogin = JSON.parse(localStorage.getItem('CachedLogin'));

    if(UserProfile === null || CachedLogin === null) return console.log("%c There's no accounts 🙀", WarnStyle);
    const CurrentProfile = UserProfile[CachedLogin];

    SideInfoUsername.textContent = CurrentProfile.username;
    SideInfoPfp.src = `/cdn/img/profilePictures/${CurrentProfile.profilePicture}.png`;
}