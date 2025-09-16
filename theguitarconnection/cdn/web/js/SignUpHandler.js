const signUpMenus = document.getElementById('signUpMenus');
const signupSubtitle =  document.getElementById('signupSubtitle');
const signupSubtitleSubs = ["Hello, lets get you started!", "Select a profile picture.", "Thanks for joining!"];

const DebugUsernameMenuBtn = document.getElementById('DebugUsernameMenuBtn');
const DebugPfpMenuBtn = document.getElementById('DebugPfpMenuBtn');
const DebugFinishMenuBtn = document.getElementById('DebugFinishMenuBtn');

const SubmitUsername =  document.getElementById('SubmitUsername');
const usernameInput = document.getElementById('usernameIpt');

const debugCurrentPfp = document.getElementById('debugCurrentPfp');
const SelectPfpBtn = document.getElementById('SelectPfpBtn');
const ProfilePictureSelect = document.getElementById('ProfilePictureSelect');
const PfpBackBtn = document.getElementById('PfpBackBtn');
const PfpNextBtn = document.getElementById('PfpNextBtn');
const PfpOptions = ["Blue", "Electric", "ElectricMind", "EvilRed", "Grib", "Mustard", "OutsideWorld", "Pink", "UltraBlue"];

const FinishSignup = document.getElementById('FinishSignup');

let currentInfo = {
    "username": "",
    "profilePicture": ""
};

usernameInput.onkeydown = (event) => {
    if(event.key === "Enter")
        SetUsernameInfo();
}
SubmitUsername.onclick = () => SetUsernameInfo();

PfpBackBtn.onclick = () => SetPfpDisplay(1);
PfpNextBtn.onclick = () => SetPfpDisplay(0);
SelectPfpBtn.onclick = () => SetProfilePictureInfo();

FinishSignup.onclick = () => CreateUserProfile();

SetTabMenu(0);
DebugUsernameMenuBtn.onclick = () => SetTabMenu(0);
DebugPfpMenuBtn.onclick = () => SetTabMenu(1);
DebugFinishMenuBtn.onclick = () => SetTabMenu(2);

function SetTabMenu(index){
    const signUpMenusChildren = signUpMenus.children;
    const signUpMenusChildrenArray = Array.from(signUpMenusChildren);

    signUpMenusChildrenArray.forEach(signUpMenusChild => signUpMenusChild.style.display = 'none');
    signUpMenusChildren[index].style.display = '';
    signupSubtitle.innerHTML = signupSubtitleSubs[index];
}

function SetUsernameInfo(){
    if(usernameInput.value.length < 4)
        return console.warn("Username must be at least 4 characters");

    currentInfo.username = usernameInput.value;
    SetTabMenu(1);
}

function SetPfpDisplay(method){
    const ImageName = ProfilePictureSelect.src.split("/")[6].split(".")[0];
    let ImageNameIndex;

    switch(method){
        case 0: ImageNameIndex = PfpOptions.indexOf(ImageName)+1; break;
        case 1: ImageNameIndex = PfpOptions.indexOf(ImageName)-1; break;
    }

    if(ImageNameIndex < 0)
        ProfilePictureSelect.src = `/cdn/img/profilePictures/${PfpOptions[PfpOptions.length-1]}.png`;
    else if (ImageNameIndex >= PfpOptions.length)
        ProfilePictureSelect.src = `/cdn/img/profilePictures/${PfpOptions[0]}.png`;
    else
        ProfilePictureSelect.src = `/cdn/img/profilePictures/${PfpOptions[ImageNameIndex]}.png`;

    if(debugCurrentPfp !== null)
        debugCurrentPfp.innerHTML = `Current pfp option: ${ProfilePictureSelect.src.split("/")[6].split(".")[0]}`;
}

function SetProfilePictureInfo(){
    currentInfo.profilePicture = ProfilePictureSelect.src.split("/")[6].split(".")[0];
    SetTabMenu(2);
}

function CreateUserProfile(){
    if(localStorage.getItem("UserProfile") === null || undefined)
        localStorage.setItem("UserProfile", JSON.stringify([]));

    let UserProfileStorage = JSON.parse(localStorage.getItem("UserProfile"));
    UserProfileStorage.push(currentInfo);
    localStorage.setItem("UserProfile", JSON.stringify(UserProfileStorage));
    localStorage.setItem("CachedLogin", UserProfileStorage.length-1);
    window.location.replace(window.location.origin + `/messages`);
}