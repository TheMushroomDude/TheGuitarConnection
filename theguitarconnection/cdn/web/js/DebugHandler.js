const debugTools = document.getElementById('debugTools');
const debugLocalStorageValues = document.getElementById('debugLocalStorageValues');
const debugWSInfo = document.getElementById('debugWSInfo');

window.onload = () => SetTools();

function SetTools(){
    if(debugTools === null || undefined) return;

    const modeStorageItem = localStorage.getItem('debugMode');
    const isActive = modeStorageItem === 'true';
    if(isActive){
        debugTools.style.display = '';
        let UpdateInfo = setInterval(() => {
            UpdateLocalStorageValues();
            UpdateWSInfo();
        }, 600)
    }
    else
        debugTools.style.display = 'none';
}

function UpdateLocalStorageValues(){
    if(debugLocalStorageValues === null || undefined) return;
    const StorageKeys = Object.keys(localStorage);
    let StringDisplay = `---Local Storage Values--- <br>`;

    StorageKeys.forEach(key => {
        StringDisplay += `${key}: ${localStorage[key]} <br>`;
    });
    debugLocalStorageValues.innerHTML = StringDisplay;
}

function UpdateWSInfo(){
    if(socket === null || undefined) return;

    debugWSInfo.innerHTML =
        `--Debug Info-- <br>` +
        `Connected: ${socket.connected} <br>` +
        `SocketId : ${socket.p.secure} <br>` +
        `SocketId: ${socket.id} <br>`;
}